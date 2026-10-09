document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const progressBar = document.getElementById('progressBar');
  const sections = [...document.querySelectorAll('main section, .site-header')];
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    }
    if (nav) nav.classList.toggle('scrolled', scrollTop > 30);
    let current = 'home';
    sections.forEach(section => {
      if (scrollTop >= section.offsetTop - 120) current = section.id || current;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI);
  updateScrollUI();

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  };

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navToggle.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>`;
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!navMenu.classList.contains('open')) return;
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  });

  const revealAll = () => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    revealAll();
  }
});
