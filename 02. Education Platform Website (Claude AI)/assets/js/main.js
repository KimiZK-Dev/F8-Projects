// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== NAV ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// ===== MOBILE NAV =====
const hamburger = document.getElementById('nav-hamburger');
const navList = document.getElementById('nav-list');
const navActions = document.querySelector('.nav__actions');
hamburger.addEventListener('click', () => {
    navList.classList.toggle('nav__list--open');
    navActions.classList.toggle('nav__actions--open');
});

// ===== TESTIMONIALS SLIDER =====
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonials__dot');
let current = 0;

function showTestimonial(idx) {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    cards[idx].classList.add('active');
    dots[idx].classList.add('active');
    current = idx;
}

dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));

// Auto-rotate testimonials
setInterval(() => {
    showTestimonial((current + 1) % cards.length);
}, 5000);

// ===== COURSES NAVIGATION =====
const coursePrev = document.getElementById('courses-prev');
const courseNext = document.getElementById('courses-next');
coursePrev.addEventListener('click', () => {
    courseNext.classList.remove('courses__nav-btn--active');
    coursePrev.classList.add('courses__nav-btn--active');
});
courseNext.addEventListener('click', () => {
    coursePrev.classList.remove('courses__nav-btn--active');
    courseNext.classList.add('courses__nav-btn--active');
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.course-card, .blog-card, .features__item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
