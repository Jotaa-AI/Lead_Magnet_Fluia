import { useState, useEffect, useCallback } from 'react';
import { SessionState, Question, WebhookPayload } from '../types';
import { baseQuestions } from '../data/questions';
import { WebhookService } from '../utils/webhook';
import { StorageService } from '../utils/storage';
import { generateSessionId } from '../utils/uuid';
import { replacePlaceholders } from '../utils/placeholders';
import { validateRequired, validateEmail, sanitizeInput } from '../utils/validation';

const initialState: SessionState = {
  sessionId: '',
  step: 0,
  context: {},
  progress: 0,
  currentQuestion: baseQuestions[0],
  isLoading: false,
  error: null,
  hasStarted: false,
  privacyAccepted: false,
  isFinished: false,
  summary: null,
};

export const useSession = () => {
  const [state, setState] = useState<SessionState>(initialState);
  const webhookService = WebhookService.getInstance();

  // Initialize session
  const initializeSession = useCallback(() => {
    const sessionId = generateSessionId();
    const newState = {
      ...initialState,
      sessionId,
      currentQuestion: {
        ...baseQuestions[0],
        text: replacePlaceholders(baseQuestions[0].text, {})
      }
    };
    setState(newState);
    StorageService.saveSession(newState);
  }, []);

  // Load existing session
  const loadSession = useCallback((sessionId: string) => {
    const savedState = StorageService.loadSession(sessionId);
    if (savedState) {
      setState(savedState);
      return true;
    }
    return false;
  }, []);

  // Start session
  const startSession = useCallback(() => {
    setState(prev => {
      const newState = {
        ...prev,
        hasStarted: true,
        step: 1,
        progress: Math.round((1 / baseQuestions.length) * 100)
      };
      StorageService.saveSession(newState);
      return newState;
    });
  }, []);

  // Accept privacy
  const acceptPrivacy = useCallback(() => {
    setState(prev => {
      const newState = { ...prev, privacyAccepted: true };
      StorageService.saveSession(newState);
      return newState;
    });
  }, []);

  // Submit answer
  const submitAnswer = useCallback(async (answer: any) => {
    const currentStep = state.step;
    const currentQuestion = state.currentQuestion;
    
    // Validate answer
    const sanitizedAnswer = sanitizeInput(answer, currentQuestion.input.type);
    
    if (currentQuestion.input.required) {
      if (!validateRequired(sanitizedAnswer, currentQuestion.input.type)) {
        setState(prev => ({ ...prev, error: 'Este campo es obligatorio' }));
        return;
      }
      
      if (currentQuestion.input.type === 'email' && !validateEmail(sanitizedAnswer)) {
        setState(prev => ({ ...prev, error: 'Por favor, introduce un email válido' }));
        return;
      }
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    // Update context
    const contextKey = getContextKey(currentQuestion.id);
    const newContext = {
      ...state.context,
      [contextKey]: sanitizedAnswer
    };

    try {
      // Prepare webhook payload
      const payload: WebhookPayload = {
        source: 'lead-magnet-fluia',
        sessionId: state.sessionId,
        step: currentStep,
        questionId: currentQuestion.id,
        questionText: currentQuestion.text,
        answer: sanitizedAnswer,
        context: newContext,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...(currentStep === baseQuestions.length ? { action: 'finish' } : {})
      };

      // Send to webhook
      const response = await webhookService.sendWithRetry(payload);
      
      if (response.ok) {
        // Check if session is finished
        if (response.end || currentStep >= baseQuestions.length) {
          setState(prev => {
            const newState = {
              ...prev,
              context: newContext,
              isLoading: false,
              isFinished: true,
              progress: 100,
              summary: response.summary || null
            };
            StorageService.saveSession(newState);
            return newState;
          });
          return;
        }

        // Wait for next_question from webhook response
        if (!response.next_question) {
          throw new Error('No se recibió la siguiente pregunta del servidor');
        }

        // Use AI-generated question from webhook
        const nextStep = currentStep + 1;
        const progress = Math.round((nextStep / baseQuestions.length) * 100);
        const nextQuestion: Question = {
          id: response.next_question.id || `q${nextStep.toString().padStart(2, '0')}`,
          text: response.next_question.text,
          input: response.next_question.input || { type: 'text', required: true },
          placeholders: response.next_question.placeholders || {}
        };

        setState(prev => {
          const newState = {
            ...prev,
            step: nextStep,
            context: newContext,
            currentQuestion: nextQuestion,
            progress: Math.max(progress, response.progress || progress),
            isLoading: false,
            isFinished: false
          };
          StorageService.saveSession(newState);
          return newState;
        });
      }
    } catch (error) {
      console.warn('Webhook error, using fallback:', error);
      
      // Fallback to local logic
      let nextStep = currentStep + 1;
      let nextQuestion: Question;
      let progress = Math.round((nextStep / baseQuestions.length) * 100);
      let isFinished = false;

      if (nextStep > baseQuestions.length) {
        isFinished = true;
        progress = 100;
        nextQuestion = currentQuestion;
      } else {
        const localQuestion = baseQuestions[nextStep - 1];
        nextQuestion = {
          ...localQuestion,
          text: replacePlaceholders(localQuestion.text, newContext)
        };
      }

      setState(prev => {
        const newState = {
          ...prev,
          step: nextStep,
          context: newContext,
          currentQuestion: nextQuestion,
          progress,
          isLoading: false,
          isFinished,
          error: 'Conexión inestable, seguimos sin perder tu información'
        };
        StorageService.saveSession(newState);
        return newState;
      });

      // Clear error after 3 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, error: null }));
      }, 3000);
    }
  }, [state, webhookService]);

  // Go back
  const goBack = useCallback(() => {
    if (state.step > 1) {
      const prevStep = state.step - 1;
      const prevQuestion = baseQuestions[prevStep - 1];
      const questionWithPlaceholders = {
        ...prevQuestion,
        text: replacePlaceholders(prevQuestion.text, state.context)
      };

      setState(prev => {
        const newState = {
          ...prev,
          step: prevStep,
          currentQuestion: questionWithPlaceholders,
          progress: Math.round((prevStep / baseQuestions.length) * 100),
          isFinished: false
        };
        StorageService.saveSession(newState);
        return newState;
      });
    }
  }, [state]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Reset session
  const resetSession = useCallback(() => {
    StorageService.clearSession(state.sessionId);
    initializeSession();
  }, [state.sessionId, initializeSession]);

  // Initialize on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return {
    state,
    initializeSession,
    loadSession,
    startSession,
    acceptPrivacy,
    submitAnswer,
    goBack,
    clearError,
    resetSession
  };
};

// Helper function to get context key from question ID
const getContextKey = (questionId: string): string => {
  const keyMap: Record<string, string> = {
    'q01': 'empresa_actividad',
    'q02': 'equipo_num',
    'q03': 'sector',
    'q04': 'herramientas',
    'q05': 'procesos_repetitivos',
    'q06': 'perdidas_principales',
    'q07': 'canales_captacion',
    'q08': 'gestion_admin',
    'q09': 'prioridad_1_semana',
    'q10': 'vision_robot',
    'q11': 'email_contacto'
  };
  
  return keyMap[questionId] || questionId;
};