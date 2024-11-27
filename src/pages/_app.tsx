import { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

if (typeof window !== 'undefined') {
  // Initialize any client-side only features here
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
