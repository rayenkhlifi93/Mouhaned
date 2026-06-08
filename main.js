document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADING SCREEN =====
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1600);

    // ===== THEME =====
    const themeToggle = document.getElementById('themeToggle');
    const themeTransition = document.getElementById('themeTransition');

    // Reset old dark default → light default on first visit after this update
    if (!localStorage.getItem('theme_ver')) {
        localStorage.removeItem('theme');
        localStorage.setItem('theme_ver', '1');
    }

    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    setThemeIcons(savedTheme === 'light');

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        setThemeIcons(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    function setThemeIcons(isLight) {
        themeToggle.classList.toggle('show-sun', !isLight);
    }

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Scroll-to-top button
        scrollTop.classList.toggle('visible', scrollY > 400);

        // Active nav link
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { passive: true });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Assign reveal attributes to elements
    const revealMap = [
        { sel: '.about-eyebrow', dir: 'left', delay: 0 },
        { sel: '.about-text h2', dir: 'up', delay: 100 },
        { sel: '.about-text p', dir: 'up', delay: 200 },
        { sel: '.skills', dir: 'up', delay: 300 },
        { sel: '.about-cta', dir: 'up', delay: 400 },
        { sel: '.about-image', dir: 'zoom', delay: 200 },
        { sel: '.stat-item', dir: 'up', delay: 0 },
        { sel: '.section-header', dir: 'up', delay: 0 },
        { sel: '.service-card', dir: 'up', delay: 100 },
        { sel: '.contact-card', dir: 'up', delay: 100 },
        { sel: '.contact-social-row', dir: 'up', delay: 200 },
        { sel: '.contact-cta', dir: 'up', delay: 300 },
        { sel: 'footer', dir: 'up', delay: 0 },
    ];

    revealMap.forEach(({ sel, dir, delay }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.setAttribute('data-reveal', dir);
            const d = delay + (i * 80);
            if (d) el.setAttribute('data-delay', Math.min(d, 700));
            revealObserver.observe(el);
        });
    });

    // Observe elements that already have data-reveal in HTML
    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // Gallery items already handled by existing observer
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
        el.dataset.delay = i * 120;
        observer.observe(el);
    });

    // ===== STATS COUNTER =====
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const target = parseInt(num.dataset.target);
                    const suffix = target >= 100 ? '+' : (target >= 50 ? '+' : '');
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        num.textContent = Math.floor(current) + suffix;
                    }, 25);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) statsObserver.observe(statsSection);

    // ===== TOAST =====
    const toast = document.getElementById('toast');
    function showToast(msg, type = 'success') {
        toast.textContent = msg;
        toast.className = `toast ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 3200);
    }

    function copyToClipboard(text) {
        if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok ? Promise.resolve() : Promise.reject();
    }

    const emailBtn = document.getElementById('emailButton');
    const phoneBtn = document.getElementById('phoneButton');

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.dataset.email || 'mouvisions@gmail.com';
            copyToClipboard(email)
                .then(() => showToast('Email copied!', 'success'))
                .catch(() => showToast('Copy failed', 'error'));
        });
    }

    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            const phone = phoneBtn.dataset.phone || '27912707';
            copyToClipboard('+216 ' + phone.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3'))
                .then(() => showToast('Phone number copied!', 'success'))
                .catch(() => showToast('Copy failed', 'error'));
        });
    }

    // ===== SOCIAL LINKS =====
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.href && this.href !== '#') {
                e.preventDefault();
                setTimeout(() => window.open(this.href, '_blank'), 150);
            }
        });
    });

    document.querySelectorAll('.footer-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.dataset.email || 'mouvisions@gmail.com';
            copyToClipboard(email)
                .then(() => showToast('Email copied!', 'success'))
                .catch(() => showToast('Copy failed', 'error'));
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-image');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img, .video-thumbnail img').forEach(img => {
        img.addEventListener('click', function (e) {
            if (!lightbox || !lightboxImg) return;
            const src = this.getAttribute('src') || this.src;
            if (src && !src.startsWith('http')) {
                lightboxImg.src = src;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ===== TESTIMONIAL CAROUSEL =====
    const slider = document.getElementById('testimonialSlider');
    const dots = document.querySelectorAll('#testimonialDots .dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (!slider) return;
        const slides = slider.querySelectorAll('.testimonial-card');
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    function nextSlide() {
        const total = dots.length;
        if (!total) return;
        goToSlide((currentSlide + 1) % total);
    }

    if (dots.length) {
        slideInterval = setInterval(nextSlide, 5000);
    }

});
