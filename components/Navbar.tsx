'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';

interface SubCategoryGroup {
  heading: string;
  links: { name: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  groups?: SubCategoryGroup[];
  featured?: {
    tag: string;
    title: string;
    desc: string;
    image: string;
    linkText: string;
    href: string;
  };
}

export const navItems: NavItem[] = [
  {
    label: 'Tiles',
    href: '/collections/handpainted-tiles',
    groups: [
      {
        heading: 'By Room',
        links: [
          { name: 'Handpainted Tiles', href: '/collections/handpainted-tiles' },
          { name: 'Bathroom Tiles', href: '/collections/bathroom-collection' },
          { name: 'Kitchen Floor & Wall', href: '/collections/kitchen-collection' },
          { name: 'Living Room & Hallway', href: '/collections/indoor-outdoor-tiles' },
          { name: 'Outdoor Patio Slabs', href: '/collections/patio-tiles' },
          { name: 'Shower & Wetrooms', href: '/collections/shower-tiles' },
        ],
      },
      {
        heading: 'By Material & Look',
        links: [
          { name: 'Porcelain Tiles', href: '/collections/porcelain-tiles' },
          { name: 'Natural Stone Tiles', href: '/collections/natural-stone-tiles' },
          { name: 'Marble Effect Porcelain', href: '/collections/porcelain-tiles' },
          { name: 'Terracotta Effect', href: '/collections/patio-tiles' },
          { name: 'Wood Effect Tiles', href: '/collections/porcelain-tiles' },
          { name: 'Limestone & Slate Look', href: '/collections/natural-stone-tiles' },
        ],
      },
      {
        heading: 'By Style & Format',
        links: [
          { name: 'Handpainted Delft Tiles', href: '/collections/handpainted-tiles' },
          { name: 'Large Format Slabs', href: '/collections/porcelain-tiles' },
          { name: 'Handmade & Zellige', href: '/collections/zellige-bevelled' },
          { name: 'Metro & Subway Tiles', href: '/collections/metro-tiles' },
          { name: 'Kitkat & Fluted Mosaics', href: '/collections/kitkat-mosaics' },
          { name: 'Herringbone & Chevron', href: '/collections/metro-tiles' },
        ],
      },
    ],
    featured: {
      tag: 'New In Collection',
      title: 'Handpainted Artisan Tiles',
      desc: 'Delft-inspired patterns and gloss ceramics for considered British interiors.',
      image: 'https://www.europeanheritage.co.uk/cdn/shop/files/studio-abbey-ceramic-blue.jpg?v=1775731941',
      linkText: 'Explore Handpainted Tiles',
      href: '/collections/handpainted-tiles',
    },
  },
  {
    label: 'Wood',
    href: '/#collections',
    groups: [
      {
        heading: 'Wood Flooring',
        links: [
          { name: 'Engineered Oak Flooring', href: '/#collections' },
          { name: 'Herringbone Parquet', href: '/#collections' },
          { name: 'Chevron Parquet Planks', href: '/#collections' },
          { name: 'Solid Hardwood', href: '/#collections' },
          { name: 'Aged & Distressed Planks', href: '/#collections' },
        ],
      },
      {
        heading: 'Tones & Finishes',
        links: [
          { name: 'Natural Pale Oak', href: '/#collections' },
          { name: 'Smoked & Dark Oak', href: '/#collections' },
          { name: 'Warm Honey Tones', href: '/#collections' },
          { name: 'Brushed & Natural Oiled', href: '/#collections' },
          { name: 'Lacquered Finishes', href: '/#collections' },
        ],
      },
      {
        heading: 'Installation & Care',
        links: [
          { name: 'Acoustic Underlay', href: '/#collections' },
          { name: 'Wood Flooring Adhesives', href: '/#collections' },
          { name: 'Natural Wood Oils & Cleaners', href: '/#collections' },
          { name: 'Fitting & Care Guide', href: '/#projects' },
        ],
      },
    ],
    featured: {
      tag: 'Craftsmanship',
      title: 'Engineered Natural Oak',
      desc: 'Enduring warmth, rich grain patterns and acoustic excellence underfoot.',
      image: 'https://images.pexels.com/photos/27626178/pexels-photo-27626178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      linkText: 'Discover Wood Flooring',
      href: '/#collections',
    },
  },
  {
    label: 'LVT & SPC',
    href: '/#collections',
    groups: [
      {
        heading: 'Flooring Types',
        links: [
          { name: 'Luxury Vinyl Tiles (LVT)', href: '/#collections' },
          { name: 'SPC Rigid Core Flooring', href: '/#collections' },
          { name: 'Click-Lock Flooring', href: '/#collections' },
          { name: 'Dry-Back Glue Down', href: '/#collections' },
          { name: 'Acoustic Backed SPC', href: '/#collections' },
        ],
      },
      {
        heading: 'Design & Effects',
        links: [
          { name: 'Herringbone LVT', href: '/#collections' },
          { name: 'Natural Wood Plank Look', href: '/#collections' },
          { name: 'Polished Marble Vinyl', href: '/#collections' },
          { name: 'Concrete & Slate Effects', href: '/#collections' },
        ],
      },
      {
        heading: 'Accessories',
        links: [
          { name: 'LVT Adhesives', href: '/#collections' },
          { name: 'Damp-Proof Membranes', href: '/#collections' },
          { name: 'Threshold & Profile Trims', href: '/#collections' },
          { name: 'Maintenance Cleaners', href: '/#collections' },
        ],
      },
    ],
    featured: {
      tag: '100% Waterproof',
      title: 'Rigid Core SPC Flooring',
      desc: 'Seamless style with maximum impact resistance for busy modern spaces.',
      image: 'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      linkText: 'Shop LVT & SPC',
      href: '/#collections',
    },
  },
  {
    label: 'Fixing Products',
    href: '/#collections',
    groups: [
      {
        heading: 'Adhesives & Primers',
        links: [
          { name: 'Rapid Set Flexible Adhesive', href: '/#collections' },
          { name: 'Standard Set S1 Tile Adhesive', href: '/#collections' },
          { name: 'Primers & Bonding Slurry', href: '/#collections' },
          { name: 'Self-Levelling Compounds', href: '/#collections' },
        ],
      },
      {
        heading: 'Grouts & Silicones',
        links: [
          { name: 'Flexible Wall & Floor Grout', href: '/#collections' },
          { name: 'Colour-Matched Silicone', href: '/#collections' },
          { name: 'Anti-Mould Sanitary Grout', href: '/#collections' },
          { name: 'Epoxy Chemical Grout', href: '/#collections' },
        ],
      },
      {
        heading: 'Preparation & Tools',
        links: [
          { name: 'Stone Sealers & Protectors', href: '/#collections' },
          { name: 'Tile Spacers & Levelling Clips', href: '/#collections' },
          { name: 'Waterproofing Tanking Kits', href: '/#collections' },
          { name: 'Trowels & Grouting Floats', href: '/#collections' },
        ],
      },
    ],
    featured: {
      tag: 'Installation',
      title: 'Professional Prep & Seal',
      desc: 'Trusted trade-quality adhesives, silicones and natural stone sealants.',
      image: 'https://images.pexels.com/photos/6663044/pexels-photo-6663044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      linkText: 'View All Fixings',
      href: '/#collections',
    },
  },
  {
    label: 'Advice & Information',
    href: '/#projects',
    groups: [
      {
        heading: 'Surface Guides',
        links: [
          { name: 'Outdoor Paver Buying Guide', href: '/#projects' },
          { name: 'Natural Stone vs Porcelain', href: '/#projects' },
          { name: 'Grout Colour Selection Advice', href: '/#projects' },
          { name: 'Tile Maintenance & Sealing', href: '/#projects' },
        ],
      },
      {
        heading: 'Showrooms & Services',
        links: [
          { name: 'London Showroom', href: '/#footer' },
          { name: 'Regional Showroom', href: '/#footer' },
          { name: 'Book a Design Consultation', href: '/#footer' },
          { name: 'Order Free Material Samples', href: '/collections/handpainted-tiles' },
        ],
      },
      {
        heading: 'Customer Support',
        links: [
          { name: 'Delivery & Shipping Rates', href: '/#footer' },
          { name: '30-Day Returns Policy', href: '/#footer' },
          { name: 'Trade & Architect Accounts', href: '/#footer' },
          { name: 'Frequently Asked Questions', href: '/#footer' },
        ],
      },
    ],
    featured: {
      tag: 'Design Studio',
      title: 'Showroom Consultations',
      desc: 'Meet our design team in London or Yorkshire for tailored project advice.',
      image: 'https://images.pexels.com/photos/20653872/pexels-photo-20653872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      linkText: 'Visit Showrooms',
      href: '/#footer',
    },
  },
  {
    label: 'Outlet Sale',
    href: '/#collections',
    badge: 'Sale',
  },
];

export default function Navbar() {
  const { toggleCart, totalItems, user } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavEnter = (label: string, hasSub: boolean) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (hasSub) {
      setActiveDropdown(label);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleNavLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 240);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeNavData = navItems.find((item) => item.label === activeDropdown);

  return (
    <>
      <div className="bg-[#30332f] px-2 py-2 text-center font-sans text-[11px] sm:text-[12px] md:text-[14px] tracking-tight sm:tracking-normal text-white/90 whitespace-nowrap overflow-hidden text-ellipsis">
        Order before 1pm for same day dispatch • Free samples available
      </div>

      <header
        className="frosted-nav sticky top-0 z-40 border-b border-[#30322e]/10 text-[#555b62]"
        onMouseLeave={handleNavLeave}
      >
        <div className="mx-auto flex min-h-[64px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Left Brand Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="nav-action flex items-center gap-2 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <Link
              href="/"
              className="flex items-center shrink-0 transition-opacity hover:opacity-85"
              aria-label="Homepage"
            >
              <img
                src="/Logo_Webnibo.png"
                alt="Webnibo"
                className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-between gap-3 font-sans text-[13px] xl:text-[14px] font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] lg:flex xl:gap-5 ml-4">
            {navItems.map((item) => {
              const isActive = activeDropdown === item.label;
              const hasSub = Boolean(item.groups && item.groups.length > 0);
              return (
                <div
                  key={item.label}
                  className="relative py-4"
                  onMouseEnter={() => handleNavEnter(item.label, hasSub)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link flex shrink-0 items-center gap-1.5 whitespace-nowrap transition-colors duration-200 ${
                      isActive ? 'text-[#7d624c]' : ''
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-1 rounded bg-[#a43b35] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-normal text-white">
                        {item.badge}
                      </span>
                    )}
                    {hasSub && (
                      <ChevronDown
                        size={15}
                        strokeWidth={1.75}
                        className={`transition-transform duration-200 ${
                          isActive ? 'rotate-180 text-[#7d624c]' : ''
                        }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4 font-sans text-[14px] text-[#555b62] xl:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="nav-action flex items-center gap-1.5"
              aria-label="Search catalog"
            >
              <Search size={20} strokeWidth={1.5} />
              <span className="hidden xl:inline">Search</span>
            </button>
            <Link
              href="/account/login"
              className="nav-action hidden sm:flex items-center gap-1.5"
              aria-label={user ? `My Account (${user.name})` : "Log in or create account"}
            >
              <div className="relative">
                <UserRound size={19} strokeWidth={1.5} />
                {user && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              {user && (
                <span className="hidden xl:inline text-[13px] font-semibold text-[#30322e]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </Link>
            <button
              onClick={toggleCart}
              className="nav-action relative flex"
              aria-label={`Shopping cart with ${totalItems} items`}
            >

              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#7d624c] text-[10px] font-bold text-white shadow-sm animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown with Pure White Background */}
        {activeNavData && activeNavData.groups && (
          <div
            className="animate-fade-in absolute left-0 top-full w-full border-t border-[#30322e]/10 border-b border-[#30322e]/15 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)]"
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={handleNavLeave}
          >
            <div className="mx-auto max-w-[1440px] px-6 py-9 lg:px-16">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 grid grid-cols-3 gap-8">
                  {activeNavData.groups.map((group) => (
                    <div key={group.heading} className="space-y-3.5">
                      <h4 className="border-b border-[#30322e]/12 pb-2.5 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-[#30322e]">
                        {group.heading}
                      </h4>
                      <ul className="space-y-2">
                        {group.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-center justify-between text-[14px] font-normal text-[#4a4f55] transition duration-150 hover:translate-x-1.5 hover:text-[#7d624c]"
                            >
                              <span>{link.name}</span>
                              <ArrowRight
                                size={12}
                                className="text-[#7d624c] opacity-0 transition-all duration-150 group-hover:opacity-100"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {activeNavData.featured && (
                  <div className="col-span-4 border-l border-[#30322e]/10 pl-8">
                    <Link
                      href={activeNavData.featured.href}
                      onClick={() => setActiveDropdown(null)}
                      className="group block overflow-hidden rounded border border-stone-200/80 bg-[#f8f7f5] p-4.5 transition duration-200 hover:border-[#7d624c]/40 hover:bg-[#f3f1ed]"
                    >
                      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d624c]">
                        {activeNavData.featured.tag}
                      </span>
                      <div className="mt-2.5 aspect-[16/10] overflow-hidden rounded bg-stone-200 shadow-sm">
                        <img
                          src={activeNavData.featured.image}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h5 className="mt-3.5 font-serif text-[16px] font-bold text-[#30322e]">
                        {activeNavData.featured.title}
                      </h5>
                      <p className="mt-1 font-serif text-[14px] italic leading-relaxed text-[#61656b]">
                        {activeNavData.featured.desc}
                      </p>
                      <span className="mt-3.5 inline-flex items-center gap-1.5 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#30322e] transition group-hover:text-[#7d624c]">
                        {activeNavData.featured.linkText} <ArrowRight size={13} />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#30322e] p-6 text-white">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setMenuOpen(false)} className="rounded bg-white px-2.5 py-1 transition hover:opacity-90">
              <img
                src="/Logo_Webnibo.png"
                alt="Webnibo"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-3 font-serif">
            {navItems.map((item) => {
              const hasSub = Boolean(item.groups && item.groups.length > 0);
              const isExpanded = mobileExpanded === item.label;
              return (
                <div key={item.label} className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-serif text-white transition hover:text-white/80"
                    >
                      {item.label}
                    </Link>
                    {hasSub && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                        className="p-2 text-white/70 hover:text-white"
                        aria-label={`Toggle ${item.label} subcategories`}
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  {isExpanded && item.groups && (
                    <div className="mt-4 space-y-4 pl-3">
                      {item.groups.map((group) => (
                        <div key={group.heading} className="space-y-1.5">
                          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-white/50">
                            {group.heading}
                          </p>
                          {group.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="block py-1 font-sans text-sm text-white/85 transition hover:text-white"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <button
            onClick={() => {
              setMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="mt-8 flex w-full items-center justify-between border-t border-white/20 pt-6 font-sans text-[12px] uppercase tracking-[0.16em] text-white/90 hover:text-white"
          >
            <span>Search the collection</span>
            <ArrowRight size={15} />
          </button>
          <Link
            href="/account/login"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex w-full items-center justify-between py-2 font-sans text-[12px] uppercase tracking-[0.16em] text-white/90 hover:text-white"
          >
            <span>{user ? `Account (${user.name})` : 'Sign In / Account'}</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Cart Drawer & Search Dialog */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
