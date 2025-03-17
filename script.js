const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact button
    const contactButton = document.querySelector('.cta-button');
    contactButton.addEventListener('click', () => {
        window.location.href = 'mailto:@example.com';
    });

    // Floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        icon.style.animationDelay = `${Math.random() * 2}s`;
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const background = document.querySelector('.background-animation');

        if (scrolled < hero.offsetHeight) {
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter.toLowerCase();

            // Clear the current projects grid
            projectsGrid.innerHTML = '';

            // Filter and append the projects correctly
            projectCards.forEach(card => {
                const parentLink = card.closest('a'); // Find the <a> wrapper

                // Convert dataset value to array for proper matching
                const techArray = card.dataset.tech.toLowerCase().split(' ');
                const isGroupProject = card.dataset.group === 'true';

                // Determine if project matches filter
                let shouldShow = false;

                if (filterValue === 'all') {
                    shouldShow = true;
                } else if (filterValue === 'group') {
                    shouldShow = isGroupProject;
                } else if (filterValue === 'scratch') {
                    shouldShow = techArray.includes('scratch');
                } else {
                    shouldShow = techArray.includes(filterValue);
                }

                if (shouldShow) {
                    // Clone the entire anchor element with its content
                    const clone = parentLink.cloneNode(true);
                    projectsGrid.appendChild(clone);

                    // Re-attach observer to cloned element
                    const clonedCard = clone.querySelector('.project-card');
                    observer.observe(clonedCard);
                }
            });
        });
    });

    // Trigger initial filter
    document.querySelector('.filter-btn.active').click();
});
