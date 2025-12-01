
import { useState, FormEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import ResponsePanel from '../components/ResponsePanel';
import { GeminiIcon, OpenAIIcon } from '../components/icons';

const AILabPage: NextPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [geminiReply, setGeminiReply] = useState<string | null>(null);
  const [chatgptReply, setChatgptReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeminiReply(null);
    setChatgptReply(null);

    try {
      const response = await fetch('/api/dual-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unexpected error occurred.');
      }

      const data = await response.json();
      setGeminiReply(data.geminiReply);
      setChatgptReply(data.chatgptReply);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dual-AI Research Lab</title>
        <meta name="description" content="Compare Gemini and ChatGPT responses side-by-side." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col flex-grow">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
              Dual-AI Research Lab
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Enter a prompt to compare responses from Gemini and ChatGPT.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 flex-grow mb-6">
            <ResponsePanel
              title="Gemini Response"
              icon={<GeminiIcon />}
              content={geminiReply}
              isLoading={isLoading && !geminiReply}
            />
            <ResponsePanel
              title="ChatGPT Response"
              icon={<OpenAIIcon />}
              content={chatgptReply}
              isLoading={isLoading && !chatgptReply}
            />
          </div>

          {error && (
            <div className="text-center p-4 mb-4 bg-red-900/50 text-red-300 rounded-md">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
          
          <div className="mt-auto sticky bottom-0 py-4 bg-gray-900/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none transition-shadow"
                rows={2}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="px-6 py-3 bg-indigo-600 font-semibold rounded-md hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AILabPage;
