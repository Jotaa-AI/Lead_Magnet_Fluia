import { useState, useEffect, useCallback } from 'react';
import { SessionState, Question, WebhookPayload } from '../types';
import { firstQuestion } from '../data/questions';
import { WebhookService } from '../utils/webhook';
import { StorageService } from '../utils/storage';
import { generateSessionId } from '../utils/uuid';
import { validateRequired, validateEmail, sanitizeInput } from '../utils/validation';

const initialState: SessionState = {
  sessionId: '',
  step: 0,
  context: {},
  progress: 0,
  currentQuestion: firstQuestion,
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

  // Helper function to get context key for storing answers
  const getContextKey = useCallback((questionId: string): string => {
    // For the first question (company name), use 'empresa_actividad' to align with App.tsx
    if (questionId === 'q01') {
      return 'empresa_actividad';
    }
    // For other questions, use the question ID as the context key
    return questionId;
  }, []);

  // Initialize session
  const initializeSession = useCallback(() => {
    const sessionId = generateSessionId();
    const newState = {
      ...initialState,
      sessionId,
      currentQuestion: firstQuestion
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
        progress: 8 // Aproximadamente 8% por pregunta (asumiendo ~12 preguntas)
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
      const rawResponse = await webhookService.sendWithRetry(payload);
      
      // Handle array response from n8n webhook
      let response: WebhookResponse;
      if (Array.isArray(rawResponse) && rawResponse.length > 0) {
        response = rawResponse[0];
      } else {
        response = rawResponse as WebhookResponse;
      }
      
      console.log('Processed webhook response:', response);
      
      if (response.ok !== false) { // Consider undefined as success
        // Check if session is finished
        if (response.end) {
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
          console.error('No next_question in response:', response);
          throw new Error('No se recibió la siguiente pregunta del servidor. Respuesta: ' + JSON.stringify(response));
        }

        // Use AI-generated question from webhook - handle both string and object formats
        const nextStep = currentStep + 1;
        const progress = Math.min(nextStep * 8, 100); // Aproximadamente 8% por pregunta
        
        let nextQuestion: Question;
        if (typeof response.next_question === 'string') {
          // If next_question is just a string, create a question object
          nextQuestion = {
            id: `q${nextStep.toString().padStart(2, '0')}`,
            text: response.next_question,
            input: { type: 'text', required: true },
            placeholders: {}
          };
        } else {
          // If next_question is an object, use it directly
          nextQuestion = {
            id: response.next_question.id || `q${nextStep.toString().padStart(2, '0')}`,
            text: response.next_question.text || response.next_question,
            input: response.next_question.input || { type: 'text', required: true },
            placeholders: response.next_question.placeholders || {}
          };
        }
        
        console.log('Next question created:', nextQuestion);

        setState(prev => {
          const newState = {
            ...prev,
            step: nextStep,
            context: newContext,
            currentQuestion: nextQuestion,
            progress: response.progress || progress,
            isLoading: false,
            isFinished: false
          };
          StorageService.saveSession(newState);
          return newState;
        });
      }
    } catch (error) {
      console.warn('Webhook error, using fallback:', error);
      
      // Sin webhook, no podemos continuar
      setState(prev => {
        const newState = {
          ...prev,
          context: newContext,
          isLoading: false,
          error: 'Error de conexión. Por favor, inténtalo de nuevo.'
        };
        StorageService.saveSession(newState);
        return newState;
      });

    }
  }, [state, webhookService]);

  // Go back
  const goBack = useCallback(() => {
    // Sin preguntas predefinidas, no podemos ir hacia atrás
    // La funcionalidad de "atrás" se deshabilitará en la UI
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
