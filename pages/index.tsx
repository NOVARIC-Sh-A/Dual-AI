import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// This page just redirects to the main AI Lab page.
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ai-lab');
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#111827',
        color: 'white',
        fontFamily: 'sans-serif'
      }}>
        Redirecting to the AI Lab...
      </div>
    </>
  );
}
