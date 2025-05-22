"use client"

import dynamic from 'next/dynamic';

const Humanizer = dynamic(() => import('@/components/Humanizer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Loading Humanizer...
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Please wait while we initialize the text humanizer.
        </div>
      </div>
    </div>
  )
});

export default function HumanizerClient() {
  return <Humanizer />;
}