// app/cart/error.tsx
'use client';

export default function CartError({
  error,
  reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-red-600">Cart crashed</h2>
      <pre className="mt-4 whitespace-pre-wrap text-sm bg-red-50 p-4 rounded">{error.message}</pre>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 rounded bg-black text-white">Try again</button>
    </div>
  );
}
