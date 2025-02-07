"use client";

import '@/styles/reset.css';
import { AppProps } from 'next/app';
import { ArPhotoFrameProvider } from '@/contexts/ArPhotoFrameContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ArPhotoFrameProvider>
      <Component {...pageProps} />
    </ArPhotoFrameProvider>
  );
}

export default MyApp;
