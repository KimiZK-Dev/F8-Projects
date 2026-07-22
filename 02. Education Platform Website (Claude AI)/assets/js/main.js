/* ========================================
   LESSON. – Education Platform
   Main JavaScript
   ======================================== */

(function () {
    'use strict';

    /* ── Sticky Header ──────────────────── */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    /* ── Mobile Nav Hamburger ───────────── */
    const hamburger = document.getElementById('nav-hamburger');
    const navList   = document.getElementById('nav-list');
    const navActions = document.querySelector('.nav__actions');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            if (navActions) navActions.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);

            // Animate hamburger → X
            const spans = hamburger.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity   = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });

        // Close on nav link click
        navList.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('open');
                if (navActions) navActions.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navList.classList.contains('open')) {
                navList.classList.remove('open');
                if (navActions) navActions.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });
    }

    /* ── Active Nav Link on Scroll ──────── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav__link');

    function setActiveLink() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const match = document.querySelector(`.nav__link[href="#${id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveLink, { passive: true });

    /* ── Testimonials Slider ────────────── */
    const cards  = document.querySelectorAll('.testimonial-card');
    const dots   = document.querySelectorAll('.testimonials__dot');
    let current  = 0;
    let autoPlay;

    function showTestimonial(index) {
        cards.forEach((c, i) => c.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        current = index;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(autoPlay);
            showTestimonial(i);
            startAutoPlay();
        });
    });

    function startAutoPlay() {
        autoPlay = setInterval(() => {
            showTestimonial((current + 1) % cards.length);
        }, 4500);
    }

    if (cards.length) startAutoPlay();

    /* ── Course Carousel Nav ────────────── */
    const prevBtn = document.getElementById('courses-prev');
    const nextBtn = document.getElementById('courses-next');
    const grid    = document.getElementById('courses-grid');

    if (prevBtn && nextBtn && grid) {
        const courseCards = Array.from(grid.querySelectorAll('.course-card'));
        let visibleStart  = 0;
        const perPage     = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;

        function updateCourseView() {
            const pp = perPage();
            courseCards.forEach((card, i) => {
                card.style.display = (i >= visibleStart && i < visibleStart + pp) ? '' : 'none';
            });
        }

        prevBtn.addEventListener('click', () => {
            const pp = perPage();
            visibleStart = Math.max(0, visibleStart - pp);
            updateCourseView();
        });

        nextBtn.addEventListener('click', () => {
            const pp = perPage();
            if (visibleStart + pp < courseCards.length) {
                visibleStart += pp;
                updateCourseView();
            }
        });

        window.addEventListener('resize', updateCourseView, { passive: true });
    }

    /* ── Scroll Reveal (Intersection Observer) ── */
    const revealEls = document.querySelectorAll(
        '.course-card, .blog-card, .features__item, .testimonial-card.active, .cta-section__achievement'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => {
            el.style.opacity   = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

})();
