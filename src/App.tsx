import React from 'react';
import { useSession } from './hooks/useSession';
import PrivacyScreen from './components/PrivacyScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { CompletionScreen } from './components/CompletionScreen';

function App() {
  const {
    state,
    acceptPrivacy,
    startSession,
    submitAnswer,
    goBack,
    clearError,
    resetSession
  } = useSession();

  // Privacy screen
  if (!state.privacyAccepted) {
    return (
      <PrivacyScreen
        onAccept={acceptPrivacy}
        onStart={startSession}
      />
    );
  }

  // Completion screen
  if (state.isFinished) {
    const companyName = state.context.empresa_actividad || state.context.empresa || '';
    const email = state.context.email_contacto || '';
    
    return (
      <CompletionScreen
        companyName={companyName}
        email={email}
        summary={state.summary}
        onRestart={resetSession}
      />
    );
  }

  // Question screen
  return (
    <QuestionScreen
      question={state.currentQuestion}
      step={state.step}
      totalSteps={9}
      progress={state.progress}
      isLoading={state.isLoading}
      error={state.error}
      canGoBack={state.step > 1}
      onSubmit={submitAnswer}
      onBack={goBack}
      onClearError={clearError}
    />
  );
}

export default App;