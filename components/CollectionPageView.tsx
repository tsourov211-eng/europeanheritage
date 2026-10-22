'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CollectionData, Product } from '@/lib/collections-data';
import {
  ArrowRight,
  Calculator,
  Check,
  ChevronDown,
  Eye,
  Filter,
  Grid3X3,
  Heart,
  LayoutGrid,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface CollectionPageViewProps {
  collection: CollectionData;
}

export default function CollectionPageView({ collection }: CollectionPageViewProps) {
  const { addToCart, openCart, wishlist, toggleWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [sampleOrdered, setSampleOrdered] = useState<Record<string, boolean>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [calcArea, setCalcArea] = useState<number>(3.5);

  const handleOrderSample = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.imagePrimary,
      price: 0,
      quantity: 1,
      type: 'sample',
      unit: 'sample',
      colorTag: product.colorTag,
    });
    setSampleOrdered((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setSampleOrdered((prev) => ({ ...prev, [product.id]: false }));
    }, 2800);
  };

  const handleAddTileToBasket = () => {
    if (!quickViewProduct) return;
    addToCart({
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      brand: quickViewProduct.brand,
      image: quickViewProduct.imagePrimary,
      price: quickViewProduct.pricePerM2,
      quantity: calcArea,
      type: 'tile',
      unit: 'm²',
      estimatedTiles: Math.ceil(calcArea * 1.1 * 59),
      colorTag: quickViewProduct.colorTag,
    });
    setQuickViewProduct(null);
    openCart();
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...collection.products];

    if (selectedColor !== 'All') {
      result = result.filter((p) => {
        const productTag = p.colorTag.toLowerCase();
        const filterTag = selectedColor.toLowerCase();
        return productTag.includes(filterTag) || filterTag.includes(productTag);
      });
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerM2 - b.pricePerM2);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerM2 - a.pricePerM2);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [collection.products, selectedColor, sortBy]);

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#30322e]">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="mx-auto max-w-[1440px] px-5 py-4 font-sans text-[12px] text-stone-500 lg:px-16">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[#30322e] transition">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/#collections" className="hover:text-[#30322e] transition">
              Collections
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-[#30322e]" aria-current="page">
            {collection.title}
          </li>
        </ol>
      </nav>

      {/* Collection Hero Banner */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#efece6] py-8 md:py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={collection.heroImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1100px] px-5 text-center">
          <p className="hidden md:block font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-[#7d624c]">
            {collection.subtitle}
          </p>
          <h1 className="my-1 md:mt-3 font-serif text-[32px] md:text-[54px] font-semibold text-[#30322e]">
            {collection.title}
          </h1>
          <p className="hidden md:block mx-auto mt-5 max-w-2xl font-serif text-[16px] italic leading-relaxed text-[#555a60]">
            {collection.description}
          </p>

          {/* Value Badges */}
          <div className="hidden md:flex mt-8 flex-wrap items-center justify-center gap-6 font-sans text-[13px] font-medium text-stone-600">
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-[#7d624c]" /> Considered Architectural Finishes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-[#7d624c]" /> Free Cut Samples Available
            </span>
            <span className="flex items-center gap-1.5">
              <Truck size={16} className="text-[#7d624c]" /> 2–5 Day UK Mainland Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#7d624c]" /> Rated 4.9 on Trustpilot
            </span>
          </div>
        </div>
      </section>


      {/* Filter & Toolbar Bar */}
      <section className="sticky top-[64px] z-30 border-b border-stone-200/90 bg-[#faf9f7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-3.5 lg:px-16">
          {/* Color Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="mr-2 flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-wider text-stone-500">
              <Filter size={13} /> Filter:
            </span>
            {collection.colorTags.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full px-3.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider transition ${
                    active
                      ? 'bg-[#30322e] text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-200/80 hover:text-[#30322e] border border-stone-200'
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>

          {/* Sort & Grid Controls */}
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden font-sans text-[12px] font-medium text-stone-500 sm:inline">
              Showing {filteredProducts.length} tiles
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded border border-stone-300 bg-white py-1.5 pl-3 pr-8 font-sans text-[12px] font-medium text-stone-700 outline-none hover:border-stone-400 focus:border-[#7d624c]"
                aria-label="Sort products"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
            </div>

            {/* Grid Layout Switcher */}
            <div className="hidden items-center gap-1 rounded border border-stone-300 bg-white p-0.5 md:flex">
              <button
                onClick={() => setGridCols(3)}
                aria-label="3 columns grid"
                className={`p-1.5 rounded transition ${gridCols === 3 ? 'bg-[#30322e] text-white' : 'text-stone-500 hover:text-stone-900'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                aria-label="4 columns grid"
                className={`p-1.5 rounded transition ${gridCols === 4 ? 'bg-[#30322e] text-white' : 'text-stone-500 hover:text-stone-900'}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-16">
        {filteredProducts.length === 0 ? (
          <div className="rounded-sm border border-dashed border-stone-300 p-12 text-center">
            <p className="font-serif text-xl text-stone-700">No tiles found matching the filter "{selectedColor}".</p>
            <button
              onClick={() => setSelectedColor('All')}
              className="mt-4 rounded bg-[#30322e] px-6 py-2.5 font-sans text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#7d624c]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-x-5 gap-y-10 sm:grid-cols-2 ${
              gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => {
              const isWishlisted = Boolean(wishlist[product.id]);
              const isSampleAdded = Boolean(sampleOrdered[product.id]);

              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between rounded-sm bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-stone-200/70"
                >
                  {/* Image Container with Hover Swap & Elevation */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-stone-100">
                    {/* Primary Swatch Image */}
                    <img
                      src={product.imagePrimary}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Secondary Room Scene Image (Smooth Cross-fade on Hover) */}
                    <img
                      src={product.imageSecondary}
                      alt={`${product.name} room setting`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
                      {product.badge && (
                        <span className="rounded bg-[#30322e] px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      <span className="rounded bg-white/95 px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-wider text-stone-700 shadow-sm backdrop-blur-sm">
                        Sample Available
                      </span>
                    </div>

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`Add ${product.name} to wishlist`}
                      className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow transition hover:bg-white hover:text-red-500"
                    >
                      <Heart
                        size={16}
                        className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
                      />
                    </button>

                    {/* Bottom Hover Action Drawer (Sliding up from bottom) */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-1.5 p-2.5 transition-transform duration-300 ease-out group-hover:translate-y-0">
                      <button
                        onClick={() => handleOrderSample(product)}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded py-2.5 px-3 font-sans text-[11px] font-bold uppercase tracking-wider text-white shadow-md transition ${
                          isSampleAdded ? 'bg-emerald-700' : 'bg-[#30322e] hover:bg-[#7d624c]'
                        }`}
                      >
                        {isSampleAdded ? (
                          <>
                            <Check size={14} /> Sample Added
                          </>
                        ) : (
                          'Order Free Sample'
                        )}
                      </button>

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        aria-label="Quick View Product"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white text-stone-700 shadow-md transition hover:bg-stone-100 hover:text-[#7d624c]"
                      >
                        <Eye size={17} />
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata & Pricing */}
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#7d624c]">
                        {product.brand}
                      </p>
                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="mt-1 font-serif text-[16px] font-semibold leading-snug text-[#30322e] transition hover:text-[#7d624c] cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="mt-1 font-sans text-[12px] text-stone-500">
                        {product.size} • {product.finish}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-stone-100 pt-3 flex items-baseline justify-between">
                      <div>
                        <span className="font-sans text-[16px] font-bold text-[#30322e]">
                          £{product.pricePerM2.toFixed(2)}
                        </span>
                        <span className="ml-1 font-sans text-[12px] font-normal text-stone-500">
                          / m²
                        </span>
                        <p className="font-sans text-[10px] text-stone-400">
                          inc. VAT {product.pricePerTile ? `(£${product.pricePerTile.toFixed(2)} each)` : ''}
                        </p>
                      </div>

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="inline-flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#7d624c] transition hover:translate-x-1"
                      >
                        Details <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Quick View / Product Detail Modal */}
      {quickViewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-md bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
            >
              <X size={22} />
            </button>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Image Preview Gallery */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded bg-stone-100 shadow-inner">
                  <img
                    src={quickViewProduct.imagePrimary}
                    alt={quickViewProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-[4/3] overflow-hidden rounded bg-stone-100">
                    <img
                      src={quickViewProduct.imageSecondary}
                      alt="Lifestyle Scene"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded bg-stone-100">
                    <img
                      src={collection.heroImage}
                      alt="Collection Setting"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Specifications & Interactive Order Panel */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d624c]">
                    {quickViewProduct.brand} • {quickViewProduct.colorTag}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-[#30322e]">
                    {quickViewProduct.name}
                  </h2>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-sans text-2xl font-bold text-[#30322e]">
                      £{quickViewProduct.pricePerM2.toFixed(2)}
                    </span>
                    <span className="font-sans text-sm text-stone-500">per m² (inc. VAT)</span>
                  </div>

                  <p className="mt-4 font-serif text-sm leading-relaxed text-stone-600">
                    {quickViewProduct.description}
                  </p>

                  {/* Specifications Table */}
                  <div className="mt-6 rounded border border-stone-200 bg-[#fbfaf8] p-4 font-sans text-[12px]">
                    <div className="grid grid-cols-2 gap-y-2.5">
                      <span className="text-stone-500">Dimensions:</span>
                      <span className="font-semibold text-stone-800">{quickViewProduct.size}</span>

                      <span className="text-stone-500">Material:</span>
                      <span className="font-semibold text-stone-800">{quickViewProduct.material}</span>

                      <span className="text-stone-500">Finish:</span>
                      <span className="font-semibold text-stone-800">{quickViewProduct.finish}</span>

                      <span className="text-stone-500">Suitability:</span>
                      <span className="font-semibold text-stone-800">
                        {quickViewProduct.suitability.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Tile Quantity & Price Calculator */}
                  <div className="mt-5 rounded border border-[#7d624c]/20 bg-amber-50/40 p-4">
                    <div className="flex items-center gap-2 font-sans text-[12px] font-bold text-[#7d624c]">
                      <Calculator size={16} /> Tile Quantity & Area Calculator
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <label htmlFor="modal-area-input" className="font-sans text-[12px] text-stone-600">
                        Area required (m²):
                      </label>
                      <input
                        id="modal-area-input"
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={calcArea}
                        onChange={(e) => setCalcArea(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                        className="w-20 rounded border border-stone-300 bg-white px-2 py-1 text-center font-sans text-sm font-semibold text-[#30322e] outline-none"
                      />
                    </div>
                    <p className="mt-2 font-sans text-[12px] text-stone-600">
                      Estimated Cost (incl. 10% cutting wastage):{' '}
                      <strong className="text-stone-900">
                        £{(calcArea * 1.1 * quickViewProduct.pricePerM2).toFixed(2)}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-stone-200">
                  <button
                    onClick={() => handleOrderSample(quickViewProduct)}
                    className="flex w-full items-center justify-center gap-2 rounded bg-[#7d624c] py-3 font-sans text-[12px] font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#68513d]"
                  >
                    <Check size={16} />
                    {sampleOrdered[quickViewProduct.id] ? 'Sample Requested!' : 'Order Free Cut Sample'}
                  </button>

                  <button
                    onClick={handleAddTileToBasket}
                    className="flex w-full items-center justify-center gap-2 rounded border border-[#30322e] py-3 font-sans text-[12px] font-bold uppercase tracking-wider text-[#30322e] transition hover:bg-[#30322e] hover:text-white"
                  >
                    Add {calcArea} m² to Basket • £{(calcArea * quickViewProduct.pricePerM2).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Section: Topic Advice */}
      <section className="border-t border-stone-200 bg-[#f4f2ee] px-5 py-20 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-center font-sans text-[14px] font-semibold uppercase tracking-[0.12em] text-[#7d624c]">
            Interior Advice
          </p>
          <h2 className="mt-2 text-center font-serif text-[28px] font-semibold text-[#30322e]">
            Designing with {collection.title.toLowerCase()}
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded bg-white p-6 shadow-sm border border-stone-200">
              <span className="font-serif text-2xl font-bold text-[#7d624c]">01</span>
              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#30322e]">Subtle Texture & Depth</h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-stone-600">
                Opt for finishes that react dynamically to natural light throughout the day, creating warmth and architectural atmosphere without overpowering the room.
              </p>
            </div>

            <div className="rounded bg-white p-6 shadow-sm border border-stone-200">
              <span className="font-serif text-2xl font-bold text-[#7d624c]">02</span>
              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#30322e]">Grout Specification</h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-stone-600">
                Choose a tone-on-tone grout colour for a unified expanse, or a contrasting mineral grout line to celebrate format symmetry and grid geometry.
              </p>
            </div>

            <div className="rounded bg-white p-6 shadow-sm border border-stone-200">
              <span className="font-serif text-2xl font-bold text-[#7d624c]">03</span>
              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#30322e]">Longevity & Care</h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-stone-600">
                Engineered for lifetime durability in busy family homes. Non-porous surfaces clean effortlessly with mild, pH-neutral stone detergents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom & Consultation CTA */}
      <section className="bg-[#30322e] px-5 py-16 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-[#c9a882]">
            Visit Our London & Yorkshire Showrooms
          </p>
          <h2 className="mt-3 font-serif text-[28px] md:text-[34px] font-semibold">
            Experience our surfaces in person
          </h2>
          <p className="mt-4 font-serif text-[16px] italic text-white/80">
            Our design consultants in our London and Regional showrooms can help calculate quantities, supply full-sized display panels, and coordinate complementary materials.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:london@example.com"
              className="rounded border border-white px-7 py-3 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white hover:text-[#30322e]"
            >
              Book London Consultation
            </a>
            <a
              href="mailto:regional@example.com"
              className="rounded bg-[#7d624c] px-7 py-3 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#68513d]"
            >
              Book Regional Visit
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
