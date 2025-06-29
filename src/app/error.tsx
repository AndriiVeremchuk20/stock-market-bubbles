'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='flex h-screen items-center justify-center bg-primary text-secondary'>
      <div className='space-y-4 rounded-md border p-4'>
        <h2 className='text-4xl font-bold'>Something went wrong!</h2>
        <motion.button
          whileHover={{
            scale: 0.9,
          }}
          whileTap={{
            scale: 0.9,
          }}
          whileFocus={{
            scale: 1.1,
          }}
          className='rounded-md border p-3'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </motion.button>
      </div>
    </main>
  );
}
