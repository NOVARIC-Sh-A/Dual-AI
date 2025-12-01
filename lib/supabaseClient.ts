import { createClient } from '@supabase/supabase-js';

// Note: These environment variables should be set in your .env.local file.
// NEXT_PUBLIC_SUPABASE_URL is safe to be exposed to the client.
// SUPABASE_SERVICE_ROLE_KEY should ONLY be used on the server-side (like in API routes) and must be kept secret.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase environment variables are not set. Please check your .env.local file.");
}

// Create a single, server-side Supabase client with the service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface LogData {
  user_prompt: string;
  chatgpt_reply: string;
  gemini_reply: string;
  source_ip?: string;
  meta?: Record<string, any>;
}

/**
 * Logs AI interaction data to the Supabase 'ai_lab_logs' table.
 * Falls back gracefully by logging an error to the console if the database insert fails.
 * @param {LogData} data - The data to be logged.
 */
export const logToSupabase = async (data: LogData): Promise<void> => {
  try {
    const { error } = await supabaseAdmin.from('ai_lab_logs').insert([data]);

    if (error) {
      console.error('Supabase logging error:', error.message);
      // We don't throw the error to allow the API to still return a response to the user.
    }
  } catch (err) {
    // Catch any other unexpected errors during the database operation.
    console.error('Unexpected error while logging to Supabase:', err);
  }
};
