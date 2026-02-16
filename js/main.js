// ============================================
// THE ARCHITECT'S FOLIO - Interactions
// ============================================

(function () {
    'use strict';

    // Nav scroll behavior
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    var offset = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });

    // Reveal on scroll (IntersectionObserver)
    if ('IntersectionObserver' in window) {
        var revealElements = document.querySelectorAll('.reveal');

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        // Observe reveal elements, skip children of stagger containers
        revealElements.forEach(function (el) {
            if (!el.closest('.lab__grid') && !el.closest('.timeline__grid')) {
                revealObserver.observe(el);
            }
        });

        // Staggered reveal for grid children (lab cards, timeline entries)
        var gridObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var items = entry.target.querySelectorAll('.reveal');
                    Array.prototype.forEach.call(items, function (item, i) {
                        setTimeout(function () {
                            item.classList.add('visible');
                        }, i * 80);
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.lab__grid, .timeline__grid').forEach(function (el) {
            gridObserver.observe(el);
        });

    } else {
        // Fallback: just show everything
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }

})();
