'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Landmark, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { useCartStore, PROTECT_PRICE } from '../../lib/cartStore';

type MethodId = 'aba-khqr' | 'aba-mobile' | 'aba-pay' | 'card';

type Method = {
  
  id: MethodId;
  title: string;
  subtitle?: string;
  logoSrc: string;      // big left icon
  badges?: string[];    // small row of brands (for cards)
};

const METHODS: Method[] = [
  {
    id: 'aba-khqr',
    title: 'ABA KHQR',
    subtitle: 'Scan to pay with ABA app or any bank apps',
    logoSrc: '/icons/payment/aba.png',
  },
  {
    id: 'aba-mobile',
    title: 'ABA mobile',
    subtitle: 'Pay with ABA app',
    logoSrc: '/icons/payment/aba.png',
  },
  {
    id: 'aba-pay',
    title: 'ABA Pay',
    subtitle: 'ABA Cards/Bank Account/ABA mobile',
    logoSrc: '/icons/payment/aba.png',
  },
  {
    id: 'card',
    title: 'Credit/Debit Card',
    subtitle: 'Supported: Visa · PayPal',
    logoSrc: '/icons/payment/credit-card.png',     // ← hyphen matches your file
    badges: ['/icons/payment/visa.png', '/icons/payment/paypal.png'],
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  // hooks at top (no early returns)
  const items       = useCartStore((s) => s.items);
  const protectPlus = useCartStore((s) => s.protectPlus);

  const [selected, setSelected]   = useState<MethodId>('card');
  const [confirmed, setConfirmed] = useState(false);

  // totals from the same cart store as Cart
  const itemsSubtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = itemsSubtotal + (protectPlus ? PROTECT_PRICE : 0);
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!confirmed) return;
    router.push('/checkout/success');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 sm:p-8 space-y-6">
        {/* Total (matches Cart) */}
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base">Total amount to be paid</span>
          <span className="font-extrabold text-xl sm:text-2xl">{fmt(total)}</span>
        </div>

        {/* Methods */}
        <div>
          <div className="flex items-center gap-2 font-semibold mb-3">
            <Landmark size={18} />
            <h2 className="text-lg">Choose Payment Methods</h2>
          </div>

          <div className="space-y-3">
            {METHODS.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 rounded-lg border bg-gray-100/70 px-3 sm:px-4 py-3 cursor-pointer transition hover:bg-gray-100 ${
                  selected === m.id ? 'ring-2 ring-brand-green/70 border-brand-green' : 'border-gray-200'
                }`}
              >
                {/* Left icon */}
                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src={m.logoSrc}
                    alt={`${m.title} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Title + subtitle + badges */}
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base">{m.title}</div>
                  {m.subtitle && <div className="text-xs opacity-70">{m.subtitle}</div>}

                  {m.badges && (
                    <div className="mt-1 flex items-center gap-2">
                      {m.badges.map((src) => (
                        <Image
                          key={src}
                          src={src}
                          alt="brand"
                          width={28}
                          height={18}
                          className="object-contain"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Radio on right */}
                <input
                  type="radio"
                  name="payment-method"
                  className="h-5 w-5"
                  checked={selected === m.id}
                  onChange={() => setSelected(m.id)}
                  aria-label={m.title}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Confirm */}
        <label
          className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
            confirmed ? 'bg-emerald-600/30 ring-1 ring-emerald-600/60' : 'bg-gray-100'
          }`}
        >
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded border ${
              confirmed ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <Check size={14} className={confirmed ? 'opacity-100' : 'opacity-0'} />
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            aria-label="I hereby confirm this payment"
          />
          <span className="font-medium">I hereby confirm this payment</span>
        </label>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 py-3 font-semibold hover:bg-gray-300"
          >
            <ArrowLeft size={18} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={!confirmed || items.length === 0}
            className={`flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white ${
              !confirmed || items.length === 0 ? 'bg-brand-green/50 cursor-not-allowed' : 'bg-brand-green hover:opacity-90'
            }`}
          >
            <CreditCard size={18} />
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}
