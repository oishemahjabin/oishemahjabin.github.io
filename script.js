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

async function handleCollab() {
  const name = document.getElementById('col-name')?.value.trim();
  const email = document.getElementById('col-email')?.value.trim();
  const topic = document.getElementById('col-topic')?.value;
  const msg = document.getElementById('col-msg')?.value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const btn = document.querySelector('.collab-btn');
  const originalText = btn.innerHTML;
  btn.innerText = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/mahjabinoishe@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          email: email,
          topic: topic || "Not specified",
          message: msg,
          _subject: "New Collaboration Request from " + name
      })
    });

    if (response.ok) {
      document.getElementById('collab-success').classList.add('visible');
      document.getElementById('col-name').value = '';
      document.getElementById('col-email').value = '';
      document.getElementById('col-topic').value = '';
      document.getElementById('col-msg').value = '';
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  } catch (error) {
    alert('Oops! There was a problem submitting your form.');
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}


