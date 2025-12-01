import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { supabase } from "../../lib/supabaseClient";

type ApiResponse = {
  chatgptReply?: string | null;
  geminiReply?: string | null;
  error?: string;
};

// -----------------------------
// LOG ACTIVITY TO SUPABASE
// -----------------------------
const logToSupabase = async (
  user_prompt: string,
  chatgpt_reply: string | null,
  gemini_reply: string | null,
  source_ip: string | string[] | undefined
) => {
  try {
    const { error } = await supabase.from("ai_lab_logs").insert({
      user_prompt,
      chatgpt_reply,
      gemini_reply,
      source_ip: Array.isArray(source_ip) ? source_ip[0] : source_ip,
    });

    if (error) console.error("Supabase logging error:", error.message);
  } catch (err) {
    console.error("Unexpected Supabase logging error:", err);
  }
};

// -----------------------------
// API ROUTE HANDLER
// -----------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      error: "Prompt is required and must be a string.",
    });
  }

  if (!process.env.GEMINI_API_KEY || !process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "Missing GEMINI_API_KEY or OPENAI_API_KEY",
    });
  }

  try {
    const google = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Run both in parallel
    const [geminiResult, chatgptResult] = await Promise.allSettled([
      google.models.generateContent({
        model: "gemini-1.5-pro",       // ✔ STABLE MODEL
        contents: [{ text: prompt }], // ✔ Correct format
      }),

      openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      }),
    ]);

    // Gemini Response
    let geminiReply = null;
    if (geminiResult.status === "fulfilled") {
      geminiReply = geminiResult.value.response.text();
    } else {
      console.error("Gemini Error:", geminiResult.reason);
    }

    // ChatGPT Response
    let chatgptReply = null;
    if (chatgptResult.status === "fulfilled") {
      chatgptReply =
        chatgptResult.value.choices[0]?.message?.content ?? null;
    } else {
      console.error("ChatGPT Error:", chatgptResult.reason);
    }

    // Log async
    const source_ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    logToSupabase(prompt, chatgptReply, geminiReply, source_ip);

    return res.status(200).json({ geminiReply, chatgptReply });
  } catch (e) {
    console.error("Fatal API error:", e);
    return res.status(500).json({
      error: "Failed to generate AI responses.",
    });
  }
}
