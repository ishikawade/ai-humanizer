"use client"

import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration issues with the Humanizer component
const Humanizer = dynamic(() => import('@/components/Humanizer'), {
  ssr: false,
  loading: () => <p className="text-center p-12">Loading Humanizer...</p>
});

export default function HumanizerClient() {
  return <Humanizer />;
}
