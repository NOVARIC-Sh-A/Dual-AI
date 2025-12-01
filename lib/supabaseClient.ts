import { createClient } from '@supabase/supabase-js';

/**
 * IMPORTANT:
 * 
 * This client is used ONLY on server-side code (API routes, Cloud Run, backend scripts).
 * It uses the SERVICE ROLE KEY, which must NEVER run on the browser.
 * 
 * NEXT_PUBLIC_SUPABASE_URL → OK to expose
 * SUPABASE_SERVICE_ROLE_KEY → MUST remain server-side only
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables only on the server.
if (typeof window === "undefined") {
  if (!supabaseUrl) {
    console.error("❌ Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!serviceRoleKey) {
    console.error("❌ Missing environment variable: SUPABASE_SERVICE_ROLE_KEY");
  }
}

// Create backend Supabase client
export const supabase = createClient(
  supabaseUrl ?? "",
  serviceRoleKey ?? "",
  {
    auth: {
      persistSession: false, // No browser sessions — backend only
    }
  }
);
