(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-seen');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-seen'));
  }

  if (finePointer && !reducedMotion) {
    document.querySelectorAll('[data-tilt]').forEach((media) => {
      media.addEventListener('pointermove', (event) => {
        const rect = media.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        media.style.setProperty('--tilt-x', `${(nx * 8).toFixed(2)}px`);
        media.style.setProperty('--tilt-y', `${(ny * 8).toFixed(2)}px`);
      });
      media.addEventListener('pointerleave', () => {
        media.style.removeProperty('--tilt-x');
        media.style.removeProperty('--tilt-y');
      });
    });

    const heroFrame = document.querySelector('[data-depth]');
    if (heroFrame) {
      let scheduled = false;
      const updateDepth = () => {
        const rect = heroFrame.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - viewport / 2) / viewport));
        heroFrame.style.setProperty('--depth-y', `${(progress * -18).toFixed(1)}px`);
        scheduled = false;
      };
      window.addEventListener('scroll', () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(updateDepth);
      }, { passive: true });
      updateDepth();
    }
  }

  document.querySelectorAll('.mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = link.closest('details');
      if (menu) menu.open = false;
    });
  });
})();
