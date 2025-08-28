// app/global-error.tsx
'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="p-8">
        <h1 className="text-red-600 text-xl font-bold">App crashed</h1>
        <pre className="mt-4 whitespace-pre-wrap bg-red-50 p-4 rounded">{error.message}</pre>
        <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-black text-white rounded">
          Try again
        </button>
      </body>
    </html>
  );
}
