"use client";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import LinkedInWrapped from "./components/LinkedInWrapped";
import Header from "./components/Header";
import Footer from "./components/Footer";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="text-center mt-8">
      <p className="text-red-600 font-bold">Something went wrong:</p>
      <pre className="text-sm text-red-500 mt-2">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LinkedInWrapped />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
