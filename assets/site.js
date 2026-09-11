(() => {
  'use strict';

  document.documentElement.classList.add('js-motion');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const heroVideo = document.querySelector('.hero-video');
  if (reducedMotion && heroVideo) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }

  const motionToggle = document.querySelector('.hero-motion-toggle');
  if (heroVideo && motionToggle) {
    const syncMotionToggle = () => {
      motionToggle.textContent = heroVideo.paused ? 'PLAY' : 'PAUSE';
      motionToggle.setAttribute('aria-label', heroVideo.paused ? '映像を再生' : '映像を一時停止');
    };
    if (reducedMotion) {
      motionToggle.hidden = true;
    } else {
      motionToggle.addEventListener('click', async () => {
        if (heroVideo.paused) { try { await heroVideo.play(); } catch {} } else { heroVideo.pause(); }
        syncMotionToggle();
      });
      heroVideo.addEventListener('play', syncMotionToggle);
      heroVideo.addEventListener('pause', syncMotionToggle);
      syncMotionToggle();
    }
  }

  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('.hero');
  if (header && hero) {
    let headerFrame = 0;
    const syncHeader = () => {
      header.classList.toggle('is-past-hero', hero.getBoundingClientRect().bottom <= header.offsetHeight);
      headerFrame = 0;
    };
    const requestHeaderSync = () => {
      if (headerFrame) return;
      headerFrame = requestAnimationFrame(syncHeader);
    };
    window.addEventListener('scroll', requestHeaderSync, { passive: true });
    window.addEventListener('resize', requestHeaderSync, { passive: true });
    syncHeader();
  }

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

  const cutSections = [...document.querySelectorAll('[data-cut]')];
  if ('IntersectionObserver' in window && !reducedMotion) {
    const cutObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-cut');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.02 });
    cutSections.forEach((section) => cutObserver.observe(section));
  } else {
    cutSections.forEach((section) => section.classList.add('is-cut'));
  }

  const flowingStatement = document.querySelector('.flowing-statement');
  if (flowingStatement) {
    if ('IntersectionObserver' in window && !reducedMotion) {
      const statementObserver = new IntersectionObserver(([entry], observer) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-flowing');
        observer.unobserve(entry.target);
      }, { threshold: 0.28 });
      statementObserver.observe(flowingStatement);
    } else {
      flowingStatement.classList.add('is-flowing');
    }
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
      const depth = parseFloat(heroFrame.dataset.depth) || 18;
      let scheduled = false;
      const updateDepth = () => {
        const rect = heroFrame.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - viewport / 2) / viewport));
        heroFrame.style.setProperty('--depth-y', `${(progress * -depth).toFixed(1)}px`);
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

  document.querySelectorAll('.mobile-menu').forEach((menu) => {
    const summary = menu.querySelector('summary');
    const syncLabel = () => summary?.setAttribute('aria-label', menu.open ? 'メニューを閉じる' : 'メニューを開く');
    menu.addEventListener('toggle', syncLabel);
    syncLabel();
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu.open = false; }));
  });
})();
