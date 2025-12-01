
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from '../../lib/supabaseClient';

// --- Environment Variable Setup ---
// This API route requires the following environment variables to be set in your .env.local file:
// GOOGLE_API_KEY: Your API key for the Gemini API.
// OPENAI_API_KEY: Your API key for the OpenAI API.
// NEXT_PUBLIC_SUPABASE_URL: The URL of your Supabase project.
// SUPABASE_SERVICE_ROLE_KEY: The service role key for your Supabase project.

type ApiResponse = {
  chatgptReply?: string | null;
  geminiReply?: string | null;
  error?: string;
};

const logToSupabase = async (
  user_prompt: string,
  chatgpt_reply: string | null,
  gemini_reply: string | null,
  source_ip: string | string[] | undefined
) => {
  try {
    const { error } = await supabase.from('ai_lab_logs').insert({
      user_prompt,
      chatgpt_reply,
      gemini_reply,
      source_ip: Array.isArray(source_ip) ? source_ip[0] : source_ip,
    });

    if (error) {
      console.error('Supabase logging error:', error.message);
    }
  } catch (err) {
    console.error('An unexpected error occurred during Supabase logging:', err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  if (!process.env.GOOGLE_API_KEY || !process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API keys for AI services are not configured on the server." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Run both API calls in parallel for better performance
    const [geminiResult, chatgptResult] = await Promise.allSettled([
      ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      }),
      openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      }),
    ]);
    
    const geminiReply = geminiResult.status === 'fulfilled' ? geminiResult.value.text : null;
    const chatgptReply = chatgptResult.status === 'fulfilled' ? chatgptResult.value.choices[0]?.message?.content ?? null : null;

    if (geminiResult.status === 'rejected') {
        console.error("Gemini API Error:", geminiResult.reason);
    }
    if (chatgptResult.status === 'rejected') {
        console.error("ChatGPT API Error:", chatgptResult.reason);
    }

    // Log the results to Supabase asynchronously (don't block the response)
    const source_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logToSupabase(prompt, chatgptReply, geminiReply, source_ip);
    
    res.status(200).json({ geminiReply, chatgptReply });

  } catch (error) {
    console.error('Error in /api/dual-ai:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
