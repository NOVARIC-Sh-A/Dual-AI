import React, { useState, useRef, FormEvent } from 'react';
import type { NextPage } from 'next';
import ResponsePanel from '../components/ResponsePanel';
import { GeminiIcon, ChatGPTIcon, SendIcon } from '../components/icons';

const AILabPage: NextPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [chatgptReply, setChatgptReply] = useState<string>('');
  const [geminiReply, setGeminiReply] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setPrompt(e.currentTarget.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${e.currentTarget.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setChatgptReply('');
    setGeminiReply('');

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
      setChatgptReply(data.chatgptReply || 'No response received.');
      setGeminiReply(data.geminiReply || 'No response received.');
    } catch (err: any) {
      setError(err.message);
      setChatgptReply(`Failed to get response: ${err.message}`);
      setGeminiReply(`Failed to get response: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col font-sans">
      <header className="p-4 border-b border-slate-700/50 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Dual AI Research Lab</h1>
        <p className="text-sm text-slate-400">ChatGPT vs. Gemini</p>
      </header>
      
      <main className="flex-1 flex flex-col p-4 md:p-8 gap-8 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
          <ResponsePanel
            title="ChatGPT Response"
            icon={<ChatGPTIcon className="w-6 h-6" />}
            content={chatgptReply}
            isLoading={isLoading}
          />
          <ResponsePanel
            title="Gemini Response"
            icon={<GeminiIcon className="w-6 h-6" />}
            content={geminiReply}
            isLoading={isLoading}
          />
        </div>
      </main>

      <footer className="sticky bottom-0 w-full bg-slate-900/80 backdrop-blur-md p-4 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleTextareaInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Enter your prompt here..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 pr-14 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none overflow-y-hidden max-h-48"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 text-white disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <SendIcon className="w-5 h-5" />
              )}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </div>
      </footer>
    </div>
  );
};

export default AILabPage;
