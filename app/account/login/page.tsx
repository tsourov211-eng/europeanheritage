'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { getAllProducts } from '@/lib/collections-data';
import {
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Heart,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
} from 'lucide-react';

export default function AccountLoginPage() {
  const { user, login, logout, wishlist, cart, totalItems } = useCart();

  // Mode: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAccountType, setRegAccountType] = useState<'retail' | 'trade'>('retail');
  const [regCompany, setRegCompany] = useState('');
  const [regNewsletter, setRegNewsletter] = useState(true);
  const [regLoading, setRegLoading] = useState(false);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Address simulation for logged-in dashboard
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    line1: '123 Design Studio Road',
    line2: 'Suite 4B',
    city: 'London',
    postcode: 'SW1A 1AA',
    country: 'United Kingdom',
  });

  // Calculate wishlisted products
  const allProducts = getAllProducts();
  const wishlistedItems = allProducts.filter(({ product }) => Boolean(wishlist[product.id]));

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your email address and password.');
      return;
    }

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      const isTrade = loginEmail.toLowerCase().includes('trade') || loginEmail.toLowerCase().includes('arch');
      login({
        name: loginEmail.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
        email: loginEmail,
        accountType: isTrade ? 'trade' : 'retail',
        company: isTrade ? 'Heritage Architectural Design Studio' : undefined,
        phone: '+44 (0) 7911 123456',
      });
    }, 600);
  };

  // Handle Register submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim() || !regPassword.trim() || !regFirstName.trim()) return;

    setRegLoading(true);
    setTimeout(() => {
      setRegLoading(false);
      login({
        name: `${regFirstName} ${regLastName}`.trim(),
        email: regEmail,
        accountType: regAccountType,
        company: regAccountType === 'trade' ? regCompany || 'Trade Studio' : undefined,
        phone: regPhone || undefined,
      });
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#30322e]">
      {/* ── IF USER IS LOGGED IN: MY ACCOUNT DASHBOARD ── */}
      {user ? (
        <div className="min-h-screen pb-16">
          {/* Header */}
          <header className="border-b border-stone-200 bg-white px-6 py-4">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between">
              <Link
                href="/"
                className="flex items-center transition hover:opacity-85"
                aria-label="Homepage"
              >
                <img
                  src="/Logo_Webnibo.png"
                  alt="Webnibo"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </Link>
              <Link
                href="/"
                className="font-sans text-[12px] font-semibold uppercase tracking-wider text-stone-600 hover:text-[#30322e]"
              >
                ← Return to Store
              </Link>
            </div>
          </header>

          <section className="mx-auto max-w-[1200px] px-5 py-10 lg:px-16 animate-fade-in">
            {/* Welcome Header */}
            <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-8 sm:flex-row sm:items-center">
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d624c]">
                  {user.accountType === 'trade' ? 'Verified Trade Member' : 'Private Residential Client'}
                </span>
                <h1 className="mt-1 font-serif text-[32px] md:text-[40px] font-semibold text-[#30322e]">
                  Welcome back, {user.name}
                </h1>
                <p className="mt-1 font-serif text-[14px] italic text-stone-600">
                  {user.email} {user.company && `• ${user.company}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {user.accountType === 'trade' && (
                  <div className="rounded border border-amber-200 bg-amber-50 px-3.5 py-2 font-sans text-[12px] font-bold text-amber-900">
                    ★ 15% Commercial Trade Pricing Active
                  </div>
                )}
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded border border-stone-300 bg-white px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider text-stone-700 transition hover:border-[#30322e] hover:text-[#30322e]"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>

            {/* Dashboard Main Grid */}
            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-8">
                {/* Order History & Sample Requests */}
                <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Package size={20} className="text-[#7d624c]" />
                      <h2 className="font-serif text-[20px] font-semibold text-[#30322e]">
                        Recent Orders & Free Sample Dispatches
                      </h2>
                    </div>
                    <span className="font-sans text-[12px] text-stone-500">Live UK courier tracking</span>
                  </div>

                  <div className="mt-4 divide-y divide-stone-100">
                    {cart.length > 0 && (
                      <div className="py-4">
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-amber-100 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-amber-800">
                            Active Basket
                          </span>
                          <span className="font-sans text-[12px] text-stone-500">{totalItems} item(s)</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-[13px] font-sans">
                              <span className="text-stone-800 font-medium">
                                {item.name} ({item.type === 'sample' ? 'Free Sample' : `${item.quantity} m²`})
                              </span>
                              <span className="font-semibold text-[#30322e]">
                                {item.type === 'sample' ? 'FREE' : `£${(item.price * item.quantity).toFixed(2)}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-emerald-100 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            Dispatched via DPD
                          </span>
                          <span className="font-sans text-[12px] font-semibold text-stone-700">#EH-849201</span>
                        </div>
                        <p className="mt-1 font-serif text-[15px] font-semibold text-[#30322e]">
                          STUDIO Abbey Blue Gloss Finish — Free Cut Sample Swatch
                        </p>
                        <p className="font-sans text-[12px] text-stone-500">Ordered 2 days ago • Delivery: Tomorrow by 1:00 PM</p>
                      </div>
                      <span className="font-sans text-[12px] font-bold text-[#7d624c] hover:underline cursor-pointer">
                        Track Parcel →
                      </span>
                    </div>

                    <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-stone-100 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-stone-700">
                            Delivered
                          </span>
                          <span className="font-sans text-[12px] font-semibold text-stone-700">#EH-731940</span>
                        </div>
                        <p className="mt-1 font-serif text-[15px] font-semibold text-[#30322e]">
                          Dyrham Dairy Ceramic Chalk White Field Tile (14 m²)
                        </p>
                        <p className="font-sans text-[12px] text-stone-500">Delivered to London SW1 • Pallet Signed</p>
                      </div>
                      <span className="font-sans text-[12px] font-bold text-stone-700 hover:underline cursor-pointer">
                        View VAT Invoice
                      </span>
                    </div>
                  </div>
                </div>

                {/* Saved Wishlist Section */}
                <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Heart size={20} className="text-red-500 fill-red-500" />
                      <h2 className="font-serif text-[20px] font-semibold text-[#30322e]">
                        Saved Tiles & Specification Board ({wishlistedItems.length})
                      </h2>
                    </div>
                    <Link
                      href="/collections/handpainted-tiles"
                      className="font-sans text-[12px] font-semibold text-[#7d624c] hover:underline"
                    >
                      Browse More Tiles →
                    </Link>
                  </div>

                  {wishlistedItems.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="font-serif text-[16px] text-stone-600 italic">
                        You haven&apos;t favorited any tiles yet.
                      </p>
                      <p className="mt-1 font-sans text-[12px] text-stone-400">
                        Click the heart icon on any product card in our collections to curate your project moodboard.
                      </p>
                      <Link
                        href="/collections/handpainted-tiles"
                        className="mt-4 inline-block rounded bg-[#30322e] px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#7d624c]"
                      >
                        Explore Handpainted Collection
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {wishlistedItems.map(({ product, collectionSlug }) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 rounded border border-stone-200 p-3 transition hover:border-[#7d624c]"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-stone-100">
                            <img
                              src={product.imagePrimary}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-[14px] font-semibold text-[#30322e]">
                              {product.name}
                            </p>
                            <p className="font-sans text-[12px] font-bold text-[#7d624c]">
                              £{product.pricePerM2.toFixed(2)} / m²
                            </p>
                            <Link
                              href={`/collections/${collectionSlug}`}
                              className="mt-1 inline-flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-wider text-stone-600 hover:text-[#30322e]"
                            >
                              View Tile <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 lg:col-span-4">
                {/* Delivery Address Card */}
                <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-[#7d624c]" />
                      <h3 className="font-serif text-[17px] font-semibold text-[#30322e]">
                        Default UK Delivery Address
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#7d624c] hover:underline"
                    >
                      {isEditingAddress ? 'Done' : 'Edit'}
                    </button>
                  </div>

                  {isEditingAddress ? (
                    <div className="mt-4 space-y-2.5 font-sans text-[12px]">
                      <input
                        type="text"
                        value={address.line1}
                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                        className="w-full rounded border border-stone-300 p-2 text-stone-800 outline-none focus:border-[#7d624c]"
                        placeholder="Address Line 1"
                      />
                      <input
                        type="text"
                        value={address.line2}
                        onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                        className="w-full rounded border border-stone-300 p-2 text-stone-800 outline-none focus:border-[#7d624c]"
                        placeholder="Address Line 2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full rounded border border-stone-300 p-2 text-stone-800 outline-none focus:border-[#7d624c]"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          value={address.postcode}
                          onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                          className="w-full rounded border border-stone-300 p-2 text-stone-800 outline-none focus:border-[#7d624c]"
                          placeholder="Postcode"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 font-sans text-[13px] leading-relaxed text-stone-600">
                      <p className="font-semibold text-stone-800">{user.name}</p>
                      <p>{address.line1}</p>
                      <p>{address.line2}</p>
                      <p>{address.city}, {address.postcode}</p>
                      <p>{address.country}</p>
                      <p className="mt-2 text-[12px] text-stone-400">Pallet accessible delivery address</p>
                    </div>
                  )}
                </div>

                {/* Showroom Booking */}
                <div className="rounded-sm border border-stone-200 bg-[#fbfaf8] p-6 shadow-sm">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d624c]">
                    Design Concierge
                  </span>
                  <h3 className="mt-1 font-serif text-[18px] font-semibold text-[#30322e]">
                    Book Showroom Consultation
                  </h3>
                  <p className="mt-2 font-serif text-[13px] italic leading-relaxed text-stone-600">
                    Discuss your floorplans and review full-format display boards with our surface specialists.
                  </p>

                  <div className="mt-4 space-y-2">
                    <a
                      href="mailto:london@example.com?subject=Consultation%20Request"
                      className="flex w-full items-center justify-between rounded border border-[#30322e] bg-white p-2.5 font-sans text-[12px] font-semibold text-[#30322e] transition hover:bg-[#30322e] hover:text-white"
                    >
                      <span>London Showroom</span>
                      <ArrowRight size={13} />
                    </a>
                    <a
                      href="mailto:regional@example.com?subject=Consultation%20Request"
                      className="flex w-full items-center justify-between rounded border border-[#30322e] bg-white p-2.5 font-sans text-[12px] font-semibold text-[#30322e] transition hover:bg-[#30322e] hover:text-white"
                    >
                      <span>Regional Showroom</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Phone Support */}
                <div className="rounded-sm border border-stone-200 bg-white p-5 font-sans text-[12px]">
                  <p className="font-semibold text-stone-700">Need urgent trade or tile assistance?</p>
                  <div className="mt-2 flex items-center gap-2 text-stone-900 font-bold">
                    <Phone size={15} className="text-[#7d624c]" />
                    <a href="tel:+442000000000" className="hover:text-[#7d624c] transition">
                      +44 (0) 20 0000 0000
                    </a>
                  </div>

                  <p className="mt-1 text-stone-400">Mon–Fri: 8:30am – 5:30pm</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* ── DEDICATED, DISTRACTION-FREE LOGIN PAGE (ZERO NAVBAR, ZERO FOOTER) ── */
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
          {/* Centered Brand Logo */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center transition hover:opacity-85"
              aria-label="Homepage"
            >
              <img
                src="/Logo_Webnibo.png"
                alt="Webnibo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* ── 1. SIGN IN FORM ── */}
          {mode === 'login' && (
            <div className="w-full max-w-[420px] rounded-sm border border-stone-200/90 bg-white p-7 sm:p-9 shadow-sm animate-fade-in">
              <h1 className="text-center font-serif text-[26px] md:text-[30px] font-semibold text-[#30322e]">
                Sign in to your account
              </h1>

              {loginError && (
                <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 font-sans text-[13px] text-red-700">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700"
                  >
                    Email Address *
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. name@company.co.uk"
                      className="w-full rounded border border-stone-300 bg-white py-2.5 pl-10 pr-4 font-sans text-[14px] text-stone-900 outline-none transition focus:border-[#7d624c]"
                    />
                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700"
                    >
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="font-sans text-[11px] font-semibold text-[#7d624c] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded border border-stone-300 bg-white py-2.5 pl-10 pr-11 font-sans text-[14px] text-stone-900 outline-none transition focus:border-[#7d624c]"
                    />
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-stone-300 text-[#30322e] focus:ring-[#7d624c]"
                  />
                  <label htmlFor="remember-me" className="font-sans text-[12px] text-stone-600">
                    Remember this device for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded bg-[#30322e] py-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow transition hover:bg-[#7d624c] disabled:opacity-50"
                >
                  {loginLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 border-t border-stone-100 pt-4 text-center font-sans text-[13px] text-stone-600">
                <span>New to European Heritage? </span>
                <button
                  onClick={() => setMode('register')}
                  className="font-bold text-[#7d624c] hover:underline"
                >
                  Create an account
                </button>
              </div>
            </div>
          )}

          {/* ── 2. CREATE ACCOUNT FORM ── */}
          {mode === 'register' && (
            <div className="w-full max-w-[440px] rounded-sm border border-stone-200/90 bg-white p-7 sm:p-9 shadow-sm animate-fade-in">
              <h1 className="text-center font-serif text-[26px] md:text-[30px] font-semibold text-[#30322e]">
                Create an account
              </h1>
              <p className="mt-1 text-center font-sans text-[12px] text-stone-500">
                For residential and trade surface specifications
              </p>

              {/* Account Type Selector */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 font-sans text-[12px]">
                <button
                  type="button"
                  onClick={() => setRegAccountType('retail')}
                  className={`rounded border p-2.5 text-center font-bold transition ${
                    regAccountType === 'retail'
                      ? 'border-[#7d624c] bg-amber-50/40 text-[#30322e] ring-1 ring-[#7d624c]'
                      : 'border-stone-300 bg-white text-stone-600 hover:border-stone-400'
                  }`}
                >
                  Private Homeowner
                </button>

                <button
                  type="button"
                  onClick={() => setRegAccountType('trade')}
                  className={`flex items-center justify-center gap-1.5 rounded border p-2.5 text-center font-bold transition ${
                    regAccountType === 'trade'
                      ? 'border-[#7d624c] bg-amber-50/40 text-[#30322e] ring-1 ring-[#7d624c]'
                      : 'border-stone-300 bg-white text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <Briefcase size={13} className="text-[#7d624c]" /> Trade Account
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="mt-5 space-y-3.5 font-sans text-[12px]">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reg-first" className="block font-bold uppercase tracking-wider text-stone-700">
                      First Name *
                    </label>
                    <input
                      id="reg-first"
                      type="text"
                      required
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      className="mt-1 w-full rounded border border-stone-300 bg-white p-2.5 text-[13px] outline-none focus:border-[#7d624c]"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-last" className="block font-bold uppercase tracking-wider text-stone-700">
                      Last Name *
                    </label>
                    <input
                      id="reg-last"
                      type="text"
                      required
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      className="mt-1 w-full rounded border border-stone-300 bg-white p-2.5 text-[13px] outline-none focus:border-[#7d624c]"
                    />
                  </div>
                </div>

                {regAccountType === 'trade' && (
                  <div>
                    <label htmlFor="reg-company" className="block font-bold uppercase tracking-wider text-[#7d624c]">
                      Company / Practice Name *
                    </label>
                    <input
                      id="reg-company"
                      type="text"
                      required={regAccountType === 'trade'}
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="e.g. Studio Vane Architecture"
                      className="mt-1 w-full rounded border border-stone-300 bg-white p-2.5 text-[13px] outline-none focus:border-[#7d624c]"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="reg-email" className="block font-bold uppercase tracking-wider text-stone-700">
                    Email Address *
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="mt-1 w-full rounded border border-stone-300 bg-white p-2.5 text-[13px] outline-none focus:border-[#7d624c]"
                  />
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block font-bold uppercase tracking-wider text-stone-700">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="mt-1 w-full rounded border border-stone-300 bg-white p-2.5 text-[13px] outline-none focus:border-[#7d624c]"
                  />
                </div>

                <div>
                  <label htmlFor="reg-pass" className="block font-bold uppercase tracking-wider text-stone-700">
                    Password *
                  </label>
                  <input
                    id="reg-pass"
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="mt-1 w-full rounded border border-stone-300 bg-white p-2.5 text-[13px] outline-none focus:border-[#7d624c]"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="reg-news"
                    type="checkbox"
                    checked={regNewsletter}
                    onChange={(e) => setRegNewsletter(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#30322e] focus:ring-[#7d624c]"
                  />
                  <label htmlFor="reg-news" className="text-[12px] text-stone-600">
                    Email me with surface trends, care advice, and showroom news.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded bg-[#30322e] py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow transition hover:bg-[#7d624c] disabled:opacity-50"
                >
                  {regLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 border-t border-stone-100 pt-4 text-center font-sans text-[13px] text-stone-600">
                <span>Already have an account? </span>
                <button
                  onClick={() => setMode('login')}
                  className="font-bold text-[#7d624c] hover:underline"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          {/* ── 3. FORGOT PASSWORD ── */}
          {mode === 'forgot' && (
            <div className="w-full max-w-[420px] rounded-sm border border-stone-200/90 bg-white p-7 sm:p-9 shadow-sm animate-fade-in">
              <h1 className="text-center font-serif text-[26px] md:text-[30px] font-semibold text-[#30322e]">
                Reset your password
              </h1>
              <p className="mt-2 text-center font-sans text-[13px] text-stone-600">
                We will send you an email to reset your password.
              </p>

              {forgotSubmitted ? (
                <div className="mt-6 rounded border border-emerald-200 bg-emerald-50 p-4 text-center font-sans">
                  <div className="flex items-center justify-center gap-2 text-emerald-800 font-semibold text-[13px]">
                    <Check size={16} /> Recovery Link Sent
                  </div>
                  <p className="mt-1 text-[12px] text-emerald-700">
                    If an account exists for <strong>{forgotEmail}</strong>, instructions have been dispatched.
                  </p>
                  <button
                    onClick={() => {
                      setMode('login');
                      setForgotSubmitted(false);
                    }}
                    className="mt-4 rounded bg-[#30322e] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#7d624c]"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (forgotEmail.trim()) setForgotSubmitted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="forgot-email"
                      className="block font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700"
                    >
                      Email Address *
                    </label>
                    <input
                      id="forgot-email"
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. name@company.co.uk"
                      className="mt-1.5 w-full rounded border border-stone-300 bg-white py-2.5 px-3 font-sans text-[14px] outline-none focus:border-[#7d624c]"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="flex-1 rounded bg-[#30322e] py-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#7d624c]"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="rounded border border-stone-300 bg-white px-5 py-3 font-sans text-[12px] font-semibold uppercase tracking-wider text-stone-700 hover:border-stone-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Minimal Return to Store Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold text-stone-500 transition hover:text-[#30322e]"
            >
              ← Return to European Heritage Store
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
