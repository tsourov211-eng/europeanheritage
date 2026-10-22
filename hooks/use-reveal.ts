'use client';

import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const grids = document.querySelectorAll<HTMLElement>('[data-reveal-grid]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cards = entry.target.querySelectorAll<HTMLElement>('[data-reveal-card]');
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 160}ms`;
            card.classList.add('reveal-visible');
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    grids.forEach((grid) => observer.observe(grid));
    return () => observer.disconnect();
  }, []);
}
