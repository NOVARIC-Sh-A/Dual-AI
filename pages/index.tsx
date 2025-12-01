import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

/**
 * Root page of the app.
 * Automatically redirects the user to the /ai-lab interface.
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ai-lab');
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#111827',
          color: '#ffffff',
          fontSize: '1.2rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Redirecting to the AI Lab…
      </div>
    </>
  );
}
