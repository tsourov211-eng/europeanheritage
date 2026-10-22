'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { collectionsCatalog, getAllProducts } from '@/lib/collections-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search results
  const allProducts = useMemo(() => getAllProducts(), []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { collections: [], products: [] };
    }

    const matchedCollections = Object.values(collectionsCatalog).filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    const matchedProducts = allProducts
      .filter(
        ({ product }) =>
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.finish.toLowerCase().includes(q) ||
          product.colorTag.toLowerCase().includes(q) ||
          product.material.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
      )
      .slice(0, 8);

    return {
      collections: matchedCollections.slice(0, 4),
      products: matchedProducts,
    };
  }, [query, allProducts]);

  if (!isOpen) return null;

  const quickSearches = [
    'Handpainted',
    'Delft',
    'Metro tiles',
    'Bathroom',
    'Porcelain',
    'Natural stone',
    'Zellige',
    'Patio',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-stone-200 px-4 py-3.5 sm:px-6">
          <Search size={20} className="text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tiles, collections, finishes (e.g. Abbey, Delft, Sage, Marble)..."
            className="ml-3 w-full bg-transparent font-sans text-[15px] text-[#30322e] outline-none placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-3 rounded bg-stone-100 px-2 py-1 font-sans text-[11px] font-bold text-stone-600 hover:bg-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="bg-[#fbfaf8] px-6 py-4 border-b border-stone-100">
            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Popular Searches
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 font-sans text-[12px] text-stone-700 transition hover:border-[#7d624c] hover:text-[#7d624c]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Display */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {query && searchResults.collections.length === 0 && searchResults.products.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-serif text-lg text-stone-700">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 font-sans text-[13px] text-stone-500">
                Try searching for &quot;Delft&quot;, &quot;Handpainted&quot;, &quot;Porcelain&quot;, or &quot;Blue&quot;.
              </p>
            </div>
          ) : (
            <>
              {/* Matched Collections */}
              {searchResults.collections.length > 0 && (
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#7d624c]">
                    Collections ({searchResults.collections.length})
                  </h4>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {searchResults.collections.map((col) => (
                      <Link
                        key={col.slug}
                        href={`/collections/${col.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-3 rounded border border-stone-200 bg-stone-50/50 p-2.5 transition hover:border-[#7d624c] hover:bg-white"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-stone-200">
                          <img
                            src={col.heroImage}
                            alt={col.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-serif text-[14px] font-semibold text-[#30322e] group-hover:text-[#7d624c]">
                            {col.title}
                          </p>
                          <p className="truncate font-sans text-[11px] text-stone-500">
                            {col.products.length} designs available
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-stone-400 group-hover:text-[#7d624c]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Products */}
              {searchResults.products.length > 0 && (
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#7d624c]">
                    Products & Surfaces ({searchResults.products.length})
                  </h4>
                  <div className="mt-3 divide-y divide-stone-100">
                    {searchResults.products.map(({ product, collectionSlug }) => (
                      <Link
                        key={product.id}
                        href={`/collections/${collectionSlug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between py-2.5 px-2 transition hover:bg-stone-50 rounded"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-stone-100 border border-stone-200">
                            <img
                              src={product.imagePrimary}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#7d624c]">
                              {product.brand} • {product.colorTag}
                            </span>
                            <h5 className="font-serif text-[14px] font-semibold text-[#30322e] group-hover:text-[#7d624c]">
                              {product.name}
                            </h5>
                            <p className="font-sans text-[11px] text-stone-500">
                              {product.size} • {product.finish}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-sans text-[14px] font-bold text-[#30322e]">
                            £{product.pricePerM2.toFixed(2)}
                          </span>
                          <span className="font-sans text-[11px] text-stone-500"> / m²</span>
                          <p className="font-sans text-[10px] text-emerald-700 font-semibold">
                            Free sample available
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
