import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, X } from 'lucide-react';
import { Question } from '../types';

interface QuestionScreenProps {
  question: Question;
  step: number;
  totalSteps: number;
  progress: number;
  isLoading: boolean;
  error: string | null;
  canGoBack: boolean;
  onSubmit: (answer: any) => void;
  onBack: () => void;
  onClearError: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  step,
  totalSteps,
  progress,
  isLoading,
  error,
  canGoBack,
  onSubmit,
  onBack,
  onClearError
}) => {
  const [answer, setAnswer] = useState<any>('');
  const [localError, setLocalError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  // Reset answer when question changes
  useEffect(() => {
    setAnswer(question.input.type === 'multiselect' ? [] : '');
    setLocalError('');
  }, [question.id, question.input.type]);

  // Focus input when question loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [question.id]);

  // Handle Enter key submission
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && question.input.type !== 'textarea') {
        e.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [answer, question.input.type]);

  const handleSubmit = () => {
    setLocalError('');
    
    // Basic validation
    if (question.input.required) {
      if (question.input.type === 'multiselect') {
        if (!Array.isArray(answer) || answer.length === 0) {
          setLocalError('Por favor, selecciona al menos una opción');
          return;
        }
      } else {
        if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
          setLocalError('Este campo es obligatorio');
          return;
        }
      }
    }

    onSubmit(answer);
  };

  const handleMultiSelectChange = (option: string) => {
    if (Array.isArray(answer)) {
      if (answer.includes(option)) {
        setAnswer(answer.filter(item => item !== option));
      } else {
        setAnswer([...answer, option]);
      }
    } else {
      setAnswer([option]);
    }
  };

  const renderInput = () => {
    const baseInputClass = "w-full p-4 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200";

    switch (question.input.type) {
      case 'textarea':
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={question.input.placeholder}
            rows={4}
            className={`${baseInputClass} resize-none`}
          />
        );

      case 'number':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="number"
            value={answer}
            onChange={(e) => setAnswer(parseInt(e.target.value, 10) || '')}
            placeholder={question.input.placeholder}
            className={baseInputClass}
            min="0"
          />
        );

      case 'email':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="email"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={question.input.placeholder}
            className={baseInputClass}
          />
        );

      case 'select':
        return (
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`${baseInputClass} cursor-pointer`}
          >
            <option value="">Selecciona una opción...</option>
            {question.input.options?.map((option) => (
              <option key={option} value={option} className="bg-gray-800 text-white">
                {option}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            {question.input.options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-purple-400/40 cursor-pointer transition-all duration-200 group"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={() => handleMultiSelectChange(option)}
                  className="w-5 h-5 rounded border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:ring-offset-0"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={question.input.placeholder}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-200 text-sm">
              Pregunta {step} de {totalSteps}
            </span>
            <span className="text-purple-200 text-sm">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Error Alert */}
        {(error || localError) && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-200 text-sm">
                {error || localError}
              </p>
            </div>
            <button
              onClick={() => {
                onClearError();
                setLocalError('');
              }}
              className="text-red-400 hover:text-red-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
          {/* Question Text */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl text-white leading-relaxed whitespace-pre-line">
              {question.text.replace(/\\n/g, '\n')}
            </h2>
          </div>

          {/* Input */}
          <div className="mb-8">
            {renderInput()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div></div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Enviando...' : 'Siguiente'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            🔒 Tus respuestas están siendo guardadas automáticamente
          </p>
        </div>
      </div>
    </div>
  );
};