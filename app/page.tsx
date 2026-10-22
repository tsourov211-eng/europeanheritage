'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/use-reveal';
import { ArrowRight, ChevronRight } from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/7587884/pexels-photo-7587884.jpeg?auto=compress&cs=tinysrgb&h=1600&w=2400',
  patio: 'https://images.pexels.com/photos/6663044/pexels-photo-6663044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bathroom: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  marble: 'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kitchen: 'https://images.pexels.com/photos/20653872/pexels-photo-20653872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kitchenTwo: 'https://images.pexels.com/photos/27626178/pexels-photo-27626178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const heroSlides = [
  { image: images.hero, eyebrow: 'A little luxury for your everyday', title: 'Step Outside', description: 'Make your outdoors an extension of the home with beautiful, hardwearing surfaces.' },
  { image: images.bathroom, eyebrow: 'Spaces made to restore', title: 'Quiet Luxury', description: 'Create a bathroom that feels calm, tactile and entirely your own.' },
  { image: images.kitchen, eyebrow: 'The heart of the home', title: 'Make It Yours', description: 'Bring warmth, colour and character to the everyday rituals of home.' },
  { image: images.marble, eyebrow: 'Natural beauty, considered', title: 'Stone Stories', description: 'Timeless textures and enduring materials for rooms with a sense of place.' },
];

const collectionImages = [
  ['New arrivals', images.kitchenTwo, '/collections/new-arrivals'],
  ['Handpainted tiles', 'https://www.europeanheritage.co.uk/cdn/shop/files/studio-abbey-ceramic-blue.jpg?v=1775731941', '/collections/handpainted-tiles'],
  ['Porcelain tiles', images.bathroom, '/collections/porcelain-tiles'],
  ['Natural stone tiles', images.marble, '/collections/natural-stone-tiles'],
];

const categories = [
  {
    title: 'Featured tile styles',
    items: [
      ['Handpainted tiles', 'https://www.europeanheritage.co.uk/cdn/shop/files/studio-abbey-ceramic-blue.jpg?v=1775731941', '/collections/handpainted-tiles'],
      ['Metro tiles', images.kitchen, '/collections/metro-tiles'],
      ['Zellige & bevelled', 'https://images.pexels.com/photos/27626178/pexels-photo-27626178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '/collections/zellige-bevelled'],
      ['Kitkat mosaics', 'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '/collections/kitkat-mosaics'],
    ],
  },
  {
    title: 'Bathroom collections',
    items: [
      ['Bathroom collection', images.bathroom, '/collections/bathroom-collection'],
      ['Bathroom floor tiles', images.marble, '/collections/bathroom-floor-tiles'],
      ['Bathroom wall tiles', images.kitchen, '/collections/bathroom-wall-tiles'],
      ['Shower tiles', 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '/collections/shower-tiles'],
    ],
  },
  {
    title: 'Kitchen collections',
    items: [
      ['Kitchen collection', images.kitchen, '/collections/kitchen-collection'],
      ['Kitchen floor tiles', images.kitchenTwo, '/collections/kitchen-floor-tiles'],
      ['Kitchen wall tiles', images.marble, '/collections/kitchen-wall-tiles'],
      ['Splashback wall tiles', 'https://www.europeanheritage.co.uk/cdn/shop/files/studio-abbey-ceramic-blue.jpg?v=1775731941', '/collections/splashback-wall-tiles'],
    ],
  },
  {
    title: 'Outdoor collections',
    items: [
      ['Pavers', images.patio, '/collections/pavers'],
      ['Indoor outdoor tiles', 'https://images.pexels.com/photos/7587884/pexels-photo-7587884.jpeg?auto=compress&cs=tinysrgb&h=1600&w=2400', '/collections/indoor-outdoor-tiles'],
      ['Patio tiles', images.patio, '/collections/patio-tiles'],
      ['Exterior natural stone', 'https://images.pexels.com/photos/27626178/pexels-photo-27626178.jpeg?auto=compress&cs=tinysrgb&h=1600&w=2400', '/collections/exterior-natural-stone'],
    ],
  },
];

const projects = [
  { title: 'A child-friendly bathroom that brings joy to everyday conversations', image: images.bathroom, text: 'Designing a home that feels beautiful, practical and entirely your own.' },
  { title: 'From a tired terrace to a social space with soul', image: images.patio, text: 'A warm, considered outdoor room made for long lunches and late evenings.' },
  { title: 'A house of contrast and calm in the heart of Yorkshire', image: images.marble, text: 'Natural textures and unexpected colour give this renovation its character.' },
  { title: 'Everyday kitchen hallway made for the north Yorkshire light', image: images.kitchen, text: 'A timeless backdrop for the rituals that make a house feel like home.' },
];

const questions = [
  ['Outdoor porcelain pavers and patio slabs: how to choose your outdoor tiles', images.patio, 'Choosing the perfect tile for your outdoor space can feel like a big decision, especially when you want something beautiful and practical.'],
  ['Natural stone tiles: porcelain or real stone? What is the difference?', images.marble, 'Discover why the materials behave differently and how each one can bring a distinct sense of place to your home.'],
  ['How best to seal and maintain natural stone tiles?', images.bathroom, 'For far longer, timelessness is natural stone. Here is how to protect its finish and keep it looking considered.'],
  ['How to choose grout colour and style, and how to maintain it', images.kitchen, 'The small details make a big impact. Learn how to make your tile design sing from floor to ceiling.'],
];

function ImageTile({ label, src, href = '#collections' }: { label: string; src: string; href?: string }) {
  return (
    <Link href={href} className="group block reveal-card" data-reveal-card>
      <div className="image-tile overflow-hidden rounded-sm bg-stone-200">
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-center font-sans text-[14px] font-semibold uppercase tracking-[0.07em] text-stone-700 transition-colors group-hover:text-[#30322e]">
        {label}
      </p>
    </Link>
  );
}

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const activeHero = heroSlides[currentHero];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentHero((slide) => (slide + 1) % heroSlides.length);
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);

  useReveal();

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#30322e]">
      <Navbar />

      {/* Hero Section */}
      <section className="hero hero-full-screen relative flex w-full items-center justify-center overflow-hidden text-white">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.title}
            src={slide.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              index === currentHero ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/50" />
        <div key={activeHero.title} className="relative z-10 max-w-[860px] px-5 pb-8 animate-fade-in text-center">
          <p className="hidden md:block mb-3.5 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-white/90">{activeHero.eyebrow}</p>
          <h1 className="font-serif text-[38px] font-semibold leading-tight sm:text-[48px] md:text-[54px]">{activeHero.title}</h1>
          <p className="hidden md:block mx-auto mt-4 max-w-md font-serif text-[16px] italic leading-relaxed text-white/90">{activeHero.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collections/handpainted-tiles"
              className="inline-flex items-center gap-3 border border-white bg-white px-7 py-3 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-[#30322e] transition hover:bg-transparent hover:text-white"
            >
              Explore Handpainted Tiles <ArrowRight size={14} />
            </Link>
            <a
              href="#collections"
              className="inline-flex items-center gap-3 border border-white px-7 py-3 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white hover:text-[#30322e]"
            >
              Browse All Surfaces
            </a>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              aria-label={`Show ${slide.title} slide`}
              onClick={() => setCurrentHero(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentHero ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>


      {/* Trust & Delivery Grid */}
      <section className="grid grid-cols-2 border-b border-stone-200 bg-white py-6 text-center md:grid-cols-4">
        <div className="border-r border-stone-200 px-3">
          <b className="block font-sans text-[16px] font-semibold text-[#30322e]">Ready to deliver</b>
          <p className="mt-1 font-sans text-[16px] font-normal text-stone-600">We deliver our in-stock items within 2–5 business days.</p>
        </div>
        <div className="px-3 md:border-r md:border-stone-200">
          <b className="block font-sans text-[16px] font-semibold text-[#30322e]">Rated Excellent</b>
          <p className="mt-1 font-sans text-[16px] font-normal text-stone-600">Our customers have rated us ‘excellent’ on Trustpilot.</p>
        </div>
        <div className="border-t border-stone-200 px-3 pt-5 md:border-t-0 md:border-r md:border-stone-200 md:pt-0">
          <b className="block font-sans text-[16px] font-semibold text-[#30322e]">Free shipping over £1000*</b>
          <p className="mt-1 font-sans text-[16px] font-normal text-stone-600">To the UK mainland addresses. Subsidised elsewhere.</p>
        </div>
        <div className="border-t border-stone-200 px-3 pt-5 md:border-t-0 md:pt-0">
          <b className="block font-sans text-[16px] font-semibold text-[#30322e]">30 Day Returns</b>
          <p className="mt-1 font-sans text-[16px] font-normal text-stone-600">View our returns policy for unused or unwanted goods.</p>
        </div>
      </section>

      {/* Featured Press */}
      <section className="featured-press hidden md:block overflow-hidden bg-[#f1f1ef] py-9">
        <h2 className="mb-7 text-center font-serif text-[28px] font-semibold text-stone-600">Featured in</h2>
        <div className="press-marquee">
          <div className="press-track">
            <img src="/images/featured/Four_Editorial_Logos_in_a_Row.png" alt="The Standard, Remodelista, Elle Decor and The English Home" />
            <img src="/images/featured/Magazine_Logos_Trio__Sheerluxe,_Modern_Gardens,_The_Times.png" alt="SheerLuxe, Modern Gardens and The Times" />
            <img src="/images/featured/Four_Editorial_Logos_in_a_Row.png" alt="" aria-hidden="true" />
            <img src="/images/featured/Magazine_Logos_Trio__Sheerluxe,_Modern_Gardens,_The_Times.png" alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="mx-auto max-w-[1100px] px-5 py-12 md:py-20">
        <h1 className="text-center font-serif text-[28px] font-semibold text-[#474842]">Tiles that turn heads</h1>
        <h3 className="mt-3 text-center font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-stone-500">
          Browse by <span className="block mt-1 font-serif text-[28px] font-normal normal-case tracking-normal text-[#474842]">Featured collections</span>
        </h3>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-x-5" data-reveal-grid>
          {collectionImages.map(([label, src, href]) => (
            <ImageTile key={label} label={label} src={src} href={href} />
          ))}
        </div>

        {categories.map((category) => (
          <div key={category.title} className="mt-16">
            <h2 className="mb-6 text-center font-serif text-[28px] font-semibold text-[#555750]">{category.title}</h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-x-5" data-reveal-grid>
              {category.items.map(([label, src, href]) => (
                <ImageTile key={label} label={label} src={src} href={href} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Customer Projects */}
      <section id="projects" className="bg-[#f1f1ef] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-center font-sans text-[14px] font-semibold uppercase tracking-[0.1em] text-stone-500">As inspired by</p>
          <h2 className="mt-2 text-center font-serif text-[28px] font-semibold text-[#474842]">Our customers&apos; projects</h2>
          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <article key={project.title}>
                <div className="aspect-[1.15] overflow-hidden">
                  <img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
                <h3 className="mt-4 font-serif text-[18px] font-semibold leading-snug text-stone-800">{project.title}</h3>
                <p className="mt-2 font-serif text-[15px] leading-relaxed text-stone-600">{project.text}</p>
                <a href="#footer" className="mt-4 inline-block font-sans text-[14px] font-medium uppercase tracking-[0.07em] underline underline-offset-4 text-stone-700">Read more</a>
              </article>
            ))}
          </div>
          <button className="mx-auto mt-12 flex items-center gap-3 bg-[#656761] px-8 py-3 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#30322e]">
            View all <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-center font-sans text-[14px] font-semibold uppercase tracking-[0.1em] text-stone-500">Explore the</p>
          <h2 className="mt-2 text-center font-serif text-[28px] font-semibold text-[#474842]">Most commonly asked questions</h2>
          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map(([title, src, text]) => (
              <article key={title}>
                <div className="aspect-[1.15] overflow-hidden">
                  <img src={src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
                <h3 className="mt-4 font-serif text-[18px] font-semibold leading-snug text-stone-800">{title}</h3>
                <p className="mt-2 font-serif text-[15px] leading-relaxed text-stone-600">{text}</p>
                <a href="#footer" className="mt-4 inline-block font-sans text-[14px] font-medium uppercase tracking-[0.07em] underline underline-offset-4 text-stone-700">Read more</a>
              </article>
            ))}
          </div>
          <button className="mx-auto mt-12 flex items-center gap-3 bg-[#656761] px-8 py-3 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#30322e]">
            View all <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* Mailing List */}
      <section className="border-t border-stone-200 bg-[#f3f3f2] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-16">
            <h2 className="font-serif text-[28px] font-semibold leading-tight text-[#5c6470] md:max-w-[360px]">Join our Mailing List</h2>
            {subscribed ? (
              <p className="font-serif text-[16px] text-stone-600">Thank you — you&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full max-w-[500px] border border-[#777a79] bg-[#f8f8f7]">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  placeholder="Enter email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 font-sans text-[16px] text-[#30322e] outline-none placeholder:text-stone-600"
                />
                <button aria-label="Subscribe" className="px-4 text-[#666968] transition hover:bg-[#e7e7e5] hover:text-[#30322e]">
                  <ChevronRight size={23} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
          <div className="mt-12 text-center md:mt-14">
            <h3 className="font-serif text-[24px] font-semibold text-[#5c6470]">Follow us</h3>
            <div className="mt-7 flex justify-center gap-5">
              <a href="#footer" aria-label="Facebook" className="social-mark social-mark-facebook">f</a>
              <a href="#footer" aria-label="Instagram" className="social-mark social-mark-instagram">◎</a>
              <a href="#footer" aria-label="Pinterest" className="social-mark social-mark-pinterest">p</a>
              <a href="#footer" aria-label="Houzz" className="social-mark social-mark-houzz">H</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
