# Dual-AI Research Lab

This is a Next.js application that provides a side-by-side comparison of responses from Gemini and ChatGPT for any given prompt. All interactions are logged to a Supabase database for research and analysis.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the repository

First, clone this repository to your local machine.

### 2. Install Dependencies

Navigate into the project directory and install the required packages.

```bash
npm install
# or
# yarn install
```

### 3. Set Up Environment Variables

Create a file named `.env.local` in the root of your project and add the following environment variables. Replace the placeholder values with your actual keys and URLs.

```
# OpenAI API Key
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Gemini API Key
GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxxxx.supabase.co

# Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxx
```

### 4. Set Up Supabase Table

Log in to your Supabase project dashboard and run the following SQL query in the SQL Editor to create the necessary `ai_lab_logs` table.

```sql
create table public.ai_lab_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_prompt text not null,
  chatgpt_reply text,
  gemini_reply text,
  source_ip text,
  meta jsonb default '{}'::jsonb
);
```

### 5. Run the Development Server

You are now ready to start the development server.

```bash
npm run dev
```

Open [http://localhost:3000/ai-lab](http://localhost:3000/ai-lab) with your browser to see the application.

## Deployment

This Next.js application is ready for deployment on platforms that support Node.js environments.

### Deploying on Vercel

Vercel is the recommended platform for deploying Next.js applications.

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the repository into your Vercel dashboard.
3.  Configure the Environment Variables in the project settings on Vercel.
4.  Deploy! Vercel will automatically detect the Next.js framework and configure the build settings.

### Deploying on Netlify or Google Cloud Run

You can also deploy this application to other platforms like Netlify or Google Cloud Run. Ensure you configure the environment variables on your chosen platform. You may need to configure the build command (`npm run build`) and the start command (`npm start`).
