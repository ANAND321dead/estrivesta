import { useRef, useEffect, useState } from 'react';

/**
 * Adds a 'revealed' class to elements with the 'reveal' class
 * when they enter the viewport. Returns a ref to attach to a container.
 * Optionally staggers children by the given delay in ms.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  staggerDelay = 0,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay
              ? parseInt(el.dataset.delay, 10)
              : staggerDelay;
            setTimeout(() => el.classList.add('revealed'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [staggerDelay]);

  return ref;
}
