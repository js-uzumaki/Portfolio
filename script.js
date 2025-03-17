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
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact button
    const contactButton = document.querySelector('.cta-button');
    contactButton.addEventListener('click', () => {
        window.location.href = 'mailto:your.email@example.com';
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

    // Particle effect
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        document.body.appendChild(particle);

        particle.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        setTimeout(() => particle.remove(), 1000);
    }

    // Throttle mousemove events
    let throttleTimer;
    window.addEventListener('mousemove', (e) => {
        if (throttleTimer) return;

        throttleTimer = setTimeout(() => {
            createParticle(e.clientX, e.clientY);
            throttleTimer = null;
        }, 50);
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

            const filterValue = button.dataset.filter;

            // Clear the current projects grid
            projectsGrid.innerHTML = '';

            // Filter and append projects dynamically
            const filteredProjects = projectCards.filter(card => {
                const tech = card.dataset.tech;
                const isGroup = card.dataset.group === 'true';

                switch(filterValue) {
                    case 'all':
                        return true;
                    case 'group':
                        return isGroup;
                    case 'scratch':
                        return tech.includes('scratch');
                    default:
                        return tech.includes(filterValue);
                }
            });

            // Append filtered projects to the grid
            filteredProjects.forEach(card => {
                projectsGrid.appendChild(card.cloneNode(true));
            });

            // Re-observe the new project cards for animations
            const newProjectCards = document.querySelectorAll('.project-card');
            newProjectCards.forEach(card => observer.observe(card));
        });
    });
});