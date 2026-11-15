'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
const FloatingContact = dynamic(() => import('@/components/FloatingContact'), { ssr: false });

export default function IdleWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(() => setMounted(true), { timeout: 3000 });
      return () => {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(() => setMounted(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <QuoteModal />
      <Chatbot />
      <FloatingContact />
    </>
  );
}

