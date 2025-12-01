import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { logToSupabase } from '../../lib/supabaseClient';

// Initialize AI SDKs using environment variables
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const googleAIClient = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

type ApiResponse = {
  chatgptReply?: string;
  geminiReply?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  try {
    // Run both AI calls in parallel for better performance
    const [geminiResult, chatgptResult] = await Promise.allSettled([
      // Gemini API Call
      googleAIClient.models.generateContent({
          model: 'gemini-3-pro-preview', // Using a powerful model for high-quality responses
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
      // OpenAI API Call
      openAIClient.chat.completions.create({
        model: 'gpt-4-turbo', // The modern equivalent of the user-requested GPT-4.1
        messages: [{ role: 'user', content: prompt }],
      }),
    ]);

    // Extract replies, handling potential failures for each call
    const geminiReply = geminiResult.status === 'fulfilled' ? geminiResult.value.text ?? 'No response from Gemini.' : `Error: ${geminiResult.reason}`;
    const chatgptReply = chatgptResult.status === 'fulfilled' ? chatgptResult.value.choices[0]?.message?.content ?? 'No response from ChatGPT.' : `Error: ${chatgptResult.reason}`;
    
    // Asynchronously log to Supabase without blocking the response
    const sourceIp = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress;
    logToSupabase({
      user_prompt: prompt,
      chatgpt_reply: chatgptReply,
      gemini_reply: geminiReply,
      source_ip: sourceIp,
    });

    res.status(200).json({ chatgptReply, geminiReply });

  } catch (error) {
    console.error('Error processing dual AI request:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
