document.addEventListener('DOMContentLoaded', () => {

    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- INTERSECTION OBSERVER FOR ACTIVE LINK & SCROLL ANIMATIONS ---
    // Select all sections that have an ID to observe
    const sections = document.querySelectorAll('.card');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Add 'visible' class to animate cards when they scroll into view
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

            // Highlight the active navigation link based on which section is in view
            const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
