import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        Refresh Page
      </button>
    </div>
  );
};

interface Props {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: Props) => {
  const handleReset = () => {
    window.location.reload();
  };

  // Add initialization error checking
  try {
    if (!import.meta.env.VITE_AUTH0_DOMAIN || !import.meta.env.VITE_AUTH0_CLIENT_ID) {
      throw new Error('Auth0 configuration is missing. Please check your environment variables.');
    }

    return (
      <ReactErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={handleReset}
      >
        {children}
      </ReactErrorBoundary>
    );
  } catch (error) {
    return <ErrorFallback 
      error={error instanceof Error ? error : new Error('An unexpected error occurred')} 
      resetErrorBoundary={handleReset} 
    />;
  }
};

export default ErrorBoundary; 