'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalSamples,
    subtotal,
    freeDeliveryThreshold,
  } = useCart();

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const tileItems = cart.filter((item) => item.type === 'tile');
  const sampleItems = cart.filter((item) => item.type === 'sample');

  const deliveryFee =
    subtotal >= freeDeliveryThreshold || (tileItems.length === 0 && sampleItems.length > 0)
      ? 0
      : 35;

  const total = subtotal + deliveryFee;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      closeCart();
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform"
        role="dialog"
        aria-label="Shopping Basket"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4.5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-[#30322e]" />
            <h2 className="font-serif text-[20px] font-semibold text-[#30322e]">
              Your Basket
            </h2>
            <span className="rounded-full bg-[#7d624c] px-2 py-0.5 font-sans text-[11px] font-bold text-white">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close basket"
            className="rounded p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="border-b border-stone-100 bg-[#f8f7f5] px-6 py-3 font-sans text-[12px]">
          {subtotal >= freeDeliveryThreshold || (tileItems.length === 0 && sampleItems.length > 0) ? (
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <Check size={16} className="text-emerald-700 shrink-0" />
              <span>You have unlocked <strong>Free UK Mainland Delivery</strong></span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-[#7d624c]" />
                  Add <strong>£{(freeDeliveryThreshold - subtotal).toFixed(2)}</strong> for Free Delivery
                </span>
                <span className="font-semibold text-stone-500">{progressPercent}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full bg-[#7d624c] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Checkout Completed Confirmation */}
        {checkoutComplete ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check size={32} />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-[#30322e]">
              Thank you for your order!
            </h3>
            <p className="mt-2 font-serif text-[15px] italic text-stone-600">
              Our showroom logistics team has received your request and will prepare dispatch within 24 hours.
            </p>
            <div className="mt-6 rounded border border-stone-200 bg-[#f9f8f6] p-4 text-left font-sans text-[12px] text-stone-700">
              <p>✓ Order Reference: #EH-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p className="mt-1">✓ Dispatch Confirmation will be sent to your email</p>
              <p className="mt-1">✓ 2–5 Business Day Courier Tracking</p>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Basket State */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <ShoppingBag size={28} />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[#30322e]">
              Your basket is empty
            </h3>
            <p className="mt-2 font-serif text-[14px] italic text-stone-500">
              Explore our artisan handpainted tiles, order up to 4 free samples, or calculate your room area.
            </p>
            <Link
              href="/collections/handpainted-tiles"
              onClick={closeCart}
              className="mt-6 inline-flex items-center gap-2 rounded bg-[#30322e] px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-wider text-white transition hover:bg-[#7d624c]"
            >
              Browse Handpainted Tiles <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          /* Scrollable Items List */
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-start">
                {/* Thumbnail */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-stone-100 border border-stone-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#7d624c]">
                          {item.brand}
                        </p>
                        <h4 className="font-serif text-[14px] font-semibold text-[#30322e] leading-snug">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-stone-400 transition hover:text-red-500 p-0.5"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {item.type === 'sample' ? (
                      <span className="mt-1.5 inline-block rounded bg-emerald-50 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                        Free Cut Sample
                      </span>
                    ) : (
                      <p className="mt-1 font-sans text-[12px] text-stone-500">
                        £{item.price.toFixed(2)} / m² {item.estimatedTiles && `• ~${item.estimatedTiles} tiles`}
                      </p>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="mt-3 flex items-center justify-between">
                    {item.type === 'tile' ? (
                      <div className="flex items-center rounded border border-stone-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-900"
                          aria-label="Decrease area"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="min-w-[50px] text-center font-sans text-[12px] font-semibold text-[#30322e]">
                          {item.quantity} m²
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-900"
                          aria-label="Increase area"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    ) : (
                      <span className="font-sans text-[11px] text-stone-500">
                        1 sample (complimentary)
                      </span>
                    )}

                    <span className="font-sans text-[14px] font-bold text-[#30322e]">
                      {item.type === 'sample' ? 'FREE' : `£${(item.price * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Checkout Panel */}
        {cart.length > 0 && !checkoutComplete && (
          <div className="border-t border-stone-200 bg-[#faf9f7] p-6 space-y-4">
            <div className="space-y-1.5 font-sans text-[13px]">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>UK Mainland Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `£${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>VAT included (20%)</span>
                <span>£{(subtotal * 0.2).toFixed(2)}</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between font-serif text-[18px] font-bold text-[#30322e]">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded bg-[#30322e] py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-md transition hover:bg-[#7d624c]"
            >
              Proceed to Checkout • £{total.toFixed(2)}
            </button>

            <div className="flex items-center justify-center gap-3 font-sans text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#7d624c]" /> Secure Checkout
              </span>
              <span>•</span>
              <span>Free 30-Day Returns</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
