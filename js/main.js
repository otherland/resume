// LIGHT BRUTALISM + RUST ACCENT
(function () {
    'use strict';

    // SECTION NAVIGATION
    const navButtons = document.querySelectorAll('.nav__btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.hidden = true;
            });

            // Show target section
            const activeSection = document.querySelector(`.section[data-section="${targetSection}"]`);
            if (activeSection) {
                activeSection.hidden = false;
            }

            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Close all projects when switching sections
            document.querySelectorAll('.project').forEach(project => {
                project.removeAttribute('open');
                project.querySelector('.project__content').hidden = true;
            });

            // Scroll main content to top
            document.querySelector('.main').scrollTop = 0;
        });
    });

    // WORK CARD COLLAPSE/EXPAND
    const projectToggles = document.querySelectorAll('.project__toggle');

    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const project = toggle.closest('.project');
            const content = project.querySelector('.project__content');
            const isOpen = project.hasAttribute('open');

            // Close all other projects
            document.querySelectorAll('.project').forEach(p => {
                if (p !== project) {
                    p.removeAttribute('open');
                    p.querySelector('.project__content').hidden = true;
                }
            });

            // Toggle current project
            if (isOpen) {
                project.removeAttribute('open');
                content.hidden = true;
            } else {
                project.setAttribute('open', '');
                content.hidden = false;
            }
        });
    });

    // KEYBOARD NAVIGATION: w=work, e=earlier, l=lab, c=contact
    document.addEventListener('keydown', (e) => {
        if (e.target === document.body || e.target === document.documentElement) {
            const keyMap = { 'w': 'work', 'e': 'earlier', 'l': 'lab', 'c': 'contact' };
            if (keyMap[e.key.toLowerCase()]) {
                e.preventDefault();
                const button = document.querySelector(`.nav__btn[data-section="${keyMap[e.key.toLowerCase()]}"]`);
                if (button) button.click();
            }
        }
    });

    // Set initial active section (work)
    const workButton = document.querySelector('.nav__btn[data-section="work"]');
    if (workButton) {
        workButton.click();
    }

})();
