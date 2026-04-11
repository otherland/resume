// BRUTALIST NO-SCROLL RESUME
(function () {
    'use strict';

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

            // Scroll main content to top
            document.querySelector('.main').scrollTop = 0;
        });
    });

    // Keyboard navigation: w=work, e=earlier, l=lab, c=contact
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
