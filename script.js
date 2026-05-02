// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll fade-up
const items = document.querySelectorAll(
  '.qn-card, .pub-card, .project-card, .edu-card, .ra-card, .exp-item, .skill-block, .course-card, .contact-card, .ph-inner h1, .hero-text-col, .ra-body h2'
);
items.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = (i % 5) * 0.07 + 's';
});
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
items.forEach(el => obs.observe(el));

function handleCollab() {
  const name = document.getElementById('col-name')?.value.trim();
  const email = document.getElementById('col-email')?.value.trim();
  const msg = document.getElementById('col-msg')?.value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in your name, email, and message.');
    return;
  }
  const mailto = `mailto:mahjabinoishe@gmail.com?subject=Collaboration%20Request%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
  window.location.href = mailto;
  document.getElementById('collab-success').classList.add('visible');
}

// Auto-update citation count (Animated Counter)
document.addEventListener('DOMContentLoaded', () => {
  const citEl = document.getElementById('citation-count');
  if (citEl) {
    // Note: Google Scholar does not provide a public API that can be accessed 
    // directly from the frontend without CORS/CAPTCHA issues. 
    // This animates the counter up to your current Google Scholar count (418).
    // You can manually update the 'target' variable here as your citations grow.
    const target = 418;
    let count = 0;
    const speed = Math.max(10, Math.floor(2000 / target)); // ~2s animation
    
    const interval = setInterval(() => {
      count += Math.ceil(target / 50); 
      if (count >= target) {
        citEl.innerText = target;
        clearInterval(interval);
      } else {
        citEl.innerText = count;
      }
    }, speed);
  }
});
