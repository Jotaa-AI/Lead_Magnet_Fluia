export interface Question {
  id: string;
  text: string;
  input: {
    type: 'text' | 'number' | 'select' | 'multiselect' | 'email' | 'textarea';
    options?: string[];
    placeholder?: string;
    required?: boolean;
  };
  placeholders?: Record<string, any>;
}

export interface SessionState {
  sessionId: string;
  step: number;
  context: Record<string, any>;
  progress: number;
  currentQuestion: Question;
  isLoading: boolean;
  error: string | null;
  hasStarted: boolean;
  privacyAccepted: boolean;
  isFinished: boolean;
  summary: string | null;
}

export interface WebhookPayload {
  source: string;
  sessionId: string;
  step: number;
  questionId: string;
  questionText: string;
  answer: any;
  context: Record<string, any>;
  timestamp: string;
  userAgent: string;
  action?: string;
}

export interface WebhookResponse {
  ok?: boolean;
  next_question?: Question | string;
  progress?: number;
  end?: boolean;
  summary?: string | null;
}