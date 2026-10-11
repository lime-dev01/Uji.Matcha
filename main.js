// ============================================
// UJI — Logique du hero vidéo + animations
// ============================================

/* ---------- Loader ---------- */
const loaderEl = document.querySelector('.loader');

/* ---------- Lenis ---------- */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   HERO VIDÉO
   ============================================ */
const video = document.querySelector('#hero-video');
const heroIntro = document.querySelector('.hero__intro');
const scrollHint = document.querySelector('.scroll-hint');
const labels = document.querySelectorAll('.label');

let videoReady = false;
let hasPlayed = false;

/* --- La vidéo est en pause au démarrage --- */
video.pause();

/* --- Dès que la vidéo est prête, on cache le loader --- */
video.addEventListener('loadedmetadata', () => {
  videoReady = true;
  video.currentTime = 0;
  setTimeout(() => loaderEl.classList.add('hidden'), 500);
});

/* --- Fallback : si la vidéo ne charge pas, on cache le loader quand même --- */
setTimeout(() => loaderEl.classList.add('hidden'), 3000);

/* --- Fonction : déclenche la lecture de la vidéo --- */
function playHeroVideo() {
  if (!videoReady || hasPlayed) return;
  hasPlayed = true;

  // On cache le titre et le scroll-hint en douceur
  gsap.to(heroIntro, { opacity: 0, y: -40, duration: 0.8, ease: 'power2.out' });
  gsap.to(scrollHint, { opacity: 0, duration: 0.5 });

  // Lecture de la vidéo
  video.play().catch(err => {
    console.warn('Autoplay bloqué :', err);
  });
}

/* --- Quand la vidéo se termine, on affiche les labels --- */
video.addEventListener('ended', () => {
  labels.forEach((label, i) => {
    setTimeout(() => {
      label.classList.add('is-visible');
    }, i * 220);
  });

  // Petit bonus : on fait apparaître un titre discret
  gsap.to('.hero__intro .hero__title', {
    opacity: 0.15,
    y: 0,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.8,
  });
});

/* --- Reset : si on remonte tout en haut, on remet tout à zéro --- */
function resetHero() {
  if (!hasPlayed) return;
  hasPlayed = false;

  // On remet la vidéo au début et en pause
  video.pause();
  video.currentTime = 0;

  // On cache les labels
  labels.forEach(label => label.classList.remove('is-visible'));

  // On réaffiche le titre et le scroll-hint
  gsap.to(heroIntro, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  gsap.to('.hero__intro .hero__title', { opacity: 1, duration: 0.6 });
  gsap.to(scrollHint, { opacity: 0.7, duration: 0.5 });
}

/* --- Détection de l'entrée / sortie de la zone hero --- */
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  // Quand le visiteur scrolle de 30% de la hauteur du hero, on déclenche
  end: '30% top',
  onEnter: () => playHeroVideo(),
  onEnterBack: () => {
    // Si on remonte au tout début, on reset
    if (window.scrollY < 50) resetHero();
  },
});

/* --- Sécurité : si le visiteur remonte tout en haut de la page --- */
window.addEventListener('scroll', () => {
  if (window.scrollY < 20 && hasPlayed) {
    resetHero();
  }
});

/* ============================================
   RÉVÉLATIONS DES SECTIONS CLASSIQUES
   ============================================ */
document.querySelectorAll(
  '.section__eyebrow, .section__title, .section__text, .produit, .quote, .quote__sub'
).forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
    },
  });
});

/* ============================================
   HEADER : couleur adaptative
   ============================================ */
const header = document.querySelector('.header');

ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (self) => {
    // Header blanc quand on est sur la vidéo (hero)
    // Header sombre quand on est dans les sections blanches/creme
    const heroEnd = document.querySelector('.hero').offsetHeight;
    const y = window.scrollY;

    if (y < heroEnd - 100) {
      header.style.color = 'var(--blanc)';
    } else {
      header.style.color = 'var(--profond)';
    }
  },
});

/* ============================================
   CONSOLE
   ============================================ */
console.log(
  '%cUJI 🍵',
  'font-family: serif; font-size: 22px; color: #7BA05B; letter-spacing: 0.3em;'
);
