'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trash2, X, ShieldCheck } from 'lucide-react';
import { useCartStore, PROTECT_PRICE, CartItem } from '../../lib/cartStore';

const C = {
  green: '#15F02E',
  greenDark: '#0D9B6A',
  greenAlt: '#4BF024',
  grayText: '#666666',
};

export default function CartPage() {
  const { items, setItems, inc, dec, removeItem, protectPlus, setProtectPlus } = useCartStore();

  // seed demo items once (so page isn't empty)
  useEffect(() => {
    if (items.length === 0) {
      const demo: CartItem[] = [
        { id: 'womens', name: "Women's Multi", servings: '45 servings', price: 13.99, qty: 1, img: '/icons/payment/women.png' },
        { id: 'mens',   name: "Men\'s Multi",  servings: '45 servings', price: 13.99, qty: 1, img: '/icons/payment/men.png'   },
      ];
      setItems(demo);
    }
  }, [items.length, setItems]);

  // avoid hydration flicker
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + (protectPlus ? PROTECT_PRICE : 0);
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-white flex justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* top strip */}
        <div className="h-2 w-full" style={{ backgroundColor: C.green }} />

        {/* body with side bars */}
        <div className="relative">
          {/* side bars 3 + 3 aligned to title top */}
          <div className="pointer-events-none absolute inset-y-0 left-1 flex flex-col justify-between">
            <span className="w-1.5 h-10 rounded" style={{ backgroundColor: C.green }} />
            <span className="w-1.5 h-10 rounded" style={{ backgroundColor: C.green }} />
            <span className="w-1.5 h-10 rounded" style={{ backgroundColor: C.green }} />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-1 flex flex-col justify-between">
            <span className="w-1.5 h-10 rounded" style={{ backgroundColor: C.green }} />
            <span className="w-1.5 h-10 rounded" style={{ backgroundColor: C.green }} />
            <span className="w-1.5 h-10 rounded" style={{ backgroundColor: C.green }} />
          </div>

          {/* title centered */}
          <div className="grid grid-cols-3 items-center px-4 sm:px-6 py-3 bg-gray-100">
            <div />
            <div className="text-center font-semibold">Shopping Cart</div>
            <div className="flex justify-end">
              <button className="p-1 rounded hover:bg-gray-200" aria-label="Close cart">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* banner */}
          <div className="px-6 pb-3 pt-2 bg-white">
            <div className="text-center text-sm">
              <span className="font-semibold">Congrats You unlocked </span>
              <span className="font-semibold" style={{ color: C.greenDark }}>FREE SHIPPING!</span>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: C.greenAlt }} />
            </div>
          </div>

          {/* items */}
          <div className="px-4 sm:px-6">
            {items.map((item, idx) => (
              <div key={item.id} className="py-6">
                {idx > 0 && <hr className="border-gray-200" />}
                <div className="mt-6 grid grid-cols-[72px_1fr_auto] gap-4 items-center">
                  <div className="w-[72px] h-[72px] rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                    {item.img && (
                      <Image src={item.img} alt={item.name} width={72} height={72} className="object-contain" />
                    )}
                  </div>

                  <div>
                    <div className="font-semibold leading-tight">{item.name}</div>
                    {item.servings && <div className="text-xs" style={{ color: C.grayText }}>{item.servings}</div>}

                    <div className="mt-2 inline-flex items-center gap-2">
                      <button onClick={() => dec(item.id)} className="h-7 w-7 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">–</button>
                      <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md border border-gray-300 bg-white text-sm">{item.qty}</span>
                      <button onClick={() => inc(item.id)} className="h-7 w-7 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">+</button>
                    </div>

                    <button className="mt-3 w-full sm:w-[260px] rounded-full border text-sm font-semibold py-2"
                            style={{ borderColor: C.green, color: C.greenDark }}>
                      SUBSCRIBE &amp; SAVE 15%
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500" aria-label="Remove item">
                      <Trash2 size={18} />
                    </button>
                    <div className="text-right font-semibold">{fmt(item.price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* footer */}
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex items-end justify-between">
              <div className="text-[18px] font-medium">
                Subtotal ({items.reduce((n, i) => n + i.qty, 0)} items)
              </div>
              <div className="text-[18px] font-semibold">{fmt(subtotal)}</div>
            </div>

            <hr className="mt-3 border-gray-300" />

            <div className="mt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">Checkout+</div>
                    <input
                      type="radio"
                      checked={protectPlus}
                      onChange={() => setProtectPlus(!protectPlus)}
                      className="h-4 w-4"
                      aria-label="Enable Checkout+"
                    />
                  </div>
                </div>
                <div className="text-sm font-medium">{fmt(PROTECT_PRICE)}</div>
              </div>
              <div className="mt-1 text-xs text-gray-600 ml-14">
                Protection for Damage, Loss, Theft &amp; More!
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-4 block w-full text-center rounded-full py-3 font-semibold text-white"
              style={{ backgroundColor: C.green }}
            >
              CHECKOUT+
            </Link>

            <div className="mt-2 text-right text-sm text-gray-600">
              Total: <span className="font-semibold text-gray-900">{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
