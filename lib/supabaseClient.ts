
import { createClient } from '@supabase/supabase-js';

// Note: These environment variables are required for the application to function.
// NEXT_PUBLIC_SUPABASE_URL: The URL of your Supabase project.
// SUPABASE_SERVICE_ROLE_KEY: The service role key for your Supabase project (kept secret on the server).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or service role key is not defined in environment variables.');
  // Throwing an error is commented out to allow the frontend to load
  // even if the backend is not configured. The API route will fail separately.
  // throw new Error('Supabase URL or service role key is not defined in environment variables.');
}

// We initialize the client with a check to handle server/client side environments.
export const supabase = createClient(supabaseUrl!, supabaseKey!);
