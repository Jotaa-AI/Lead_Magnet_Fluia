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
        progress: 11 // Aproximadamente 11% por pregunta (9 preguntas total)
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
    const currentQuestionId = `q${currentStep.toString().padStart(2, '0')}`;
    
    // Validate answer
    const sanitizedAnswer = sanitizeInput(answer, state.currentQuestion.input.type);
    
    if (state.currentQuestion.input.required) {
      if (!validateRequired(sanitizedAnswer, state.currentQuestion.input.type)) {
        setState(prev => ({ ...prev, error: 'Este campo es obligatorio' }));
        return;
      }
      
      if (state.currentQuestion.input.type === 'email' && !validateEmail(sanitizedAnswer)) {
        setState(prev => ({ ...prev, error: 'Por favor, introduce un email válido' }));
        return;
      }
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    // Update context - use question ID directly as the variable name
    const newContext = {
      ...state.context,
      [currentQuestionId]: sanitizedAnswer
    };

    // If this is question 9, automatically finish the session
    if (currentStep === 9) {
      setState(prev => {
        const newState = {
          ...prev,
          context: newContext,
          isLoading: false,
          isFinished: true,
          progress: 100,
          summary: null
        };
        StorageService.saveSession(newState);
        return newState;
      });
      
      // Still send to webhook in background for data collection
      try {
        const payload: WebhookPayload = {
          source: 'lead-magnet-fluia',
          sessionId: state.sessionId,
          step: currentStep,
          questionId: currentQuestionId,
          questionText: state.currentQuestion.text,
          answer: sanitizedAnswer,
          context: newContext,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          action: 'finish'
        };
        webhookService.sendWithRetry(payload).catch(error => {
          console.warn('Background webhook failed:', error);
        });
      } catch (error) {
        console.warn('Background webhook error:', error);
      }
      
      return;
    }
    try {
      // Prepare webhook payload
      const payload: WebhookPayload = {
        source: 'lead-magnet-fluia',
        sessionId: state.sessionId,
        step: currentStep,
        questionId: currentQuestionId,
        questionText: state.currentQuestion.text,
        answer: sanitizedAnswer,
        context: newContext,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
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
      
      // Validate response structure
      if (!response || (response.ok === false)) {
        throw new Error('El servidor devolvió una respuesta de error');
      }
      
      // Check if response has required properties
      if (!response.next_question && !response.end) {
        console.error('Invalid webhook response format:', response);
        throw new Error('El servidor no devolvió el formato esperado. Por favor, contacta con soporte.');
      }
      
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

        // Use AI-generated question from webhook - handle both string and object formats
        const nextStep = currentStep + 1;
        const progress = Math.min(nextStep * 11, 99); // Aproximadamente 11% por pregunta (9 total)
        
        let nextQuestion: Question;
        if (typeof response.next_question === 'string') {
          // If next_question is just a string, create a question object
          nextQuestion = {
            id: currentQuestionId,
            text: response.next_question,
            input: { type: 'text', required: true },
            placeholders: {}
          };
        } else {
          // If next_question is an object, use it directly
          nextQuestion = {
            id: currentQuestionId,
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
            isFinished: false,
            questionHistory: [...(prev.questionHistory || []), prev.currentQuestion]
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
    setState(prev => {
      if (prev.step <= 1) return prev;
      
      const previousStep = prev.step - 1;
      const currentQuestionId = `q${prev.step.toString().padStart(2, '0')}`;
      
      // Remove the current question's answer from context
      const { [currentQuestionId]: removed, ...newContext } = prev.context;
      
      // Get previous question from history or use first question
      let previousQuestion = firstQuestion;
      let newHistory = prev.questionHistory || [];
      
      if (prev.questionHistory && prev.questionHistory.length > 0) {
        previousQuestion = prev.questionHistory[prev.questionHistory.length - 1];
        newHistory = prev.questionHistory.slice(0, -1);
      }
      
      const newState = {
        ...prev,
        step: previousStep,
        currentQuestion: previousQuestion,
        questionHistory: newHistory,
        context: newContext,
        progress: Math.max((previousStep - 1) * 11, 11),
        error: null,
        isLoading: false
      };
      
      StorageService.saveSession(newState);
      return newState;
    });
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
