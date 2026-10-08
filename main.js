// ============================================
// UJI — Smooth scroll + animations
// ============================================

/* ---------- Loader ---------- */
const loaderEl = document.querySelector('.loader');
setTimeout(() => loaderEl.classList.add('hidden'), 1800);

/* ---------- Lenis ---------- */
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

/* ---------- Reveal des sections ---------- */
document.querySelectorAll('.section__eyebrow, .section__title, .section__text, .produit, .quote__text, .quote__sub').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 1.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
    }
  });
});

/* ---------- Hero : parallaxe légère au scroll ---------- */
gsap.to('.hero__video', {
  yPercent: 15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  }
});

gsap.to('.hero__content', {
  opacity: 0,
  y: -60,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  }
});

/* ---------- Header : changement selon le fond ---------- */
const header = document.querySelector('.header');
const darkSections = document.querySelectorAll('.section--dark, .hero');

ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  onEnter: () => header.style.color = 'var(--blanc)',
  onLeaveBack: () => header.style.color = 'var(--blanc)',
});

/* ---------- Console ---------- */
console.log('%cUJI 🍵', 'font-family: serif; font-size: 22px; color: #7BA05B; letter-spacing: 0.3em;');
