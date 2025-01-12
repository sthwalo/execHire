'use client';

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <pre className="p-4 bg-red-50 text-red-500 rounded-lg overflow-auto max-w-full">
        {error.message}
      </pre>
      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
}

export function SafeComponent({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
