document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    if (!introOverlay) return;

    // Check if user prefers reduced motion or has seen it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introSeen = localStorage.getItem('anubis_intro_seen');

    if (prefersReducedMotion) { // temporarily removed introSeen
        removeIntro();
        return;
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const skipBtn = document.querySelector('.skip-intro');
    const audio = document.getElementById('intro-sound');
    const eye = document.querySelector('.horus-eye');
    const lightBurst = document.querySelector('.light-burst');
    const introText = document.querySelector('.intro-text');
    const flashWhite = document.createElement('div');
    
    flashWhite.className = 'flash-white';
    introOverlay.appendChild(flashWhite);

    // Sand Particles
    const sandContainer = document.querySelector('.sand-particles');
    if(sandContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'sand-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            sandContainer.appendChild(particle);
        }
    }

    // Sequence Timings
    const sequence = setTimeout(() => {
        // Phase 3: Blink and Burst (at 2s)
        eye.classList.add('eye-blink');
        
        setTimeout(() => {
            lightBurst.classList.add('burst-active');
            if (audio) {
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play blocked", e));
            }
        }, 150); // slight delay after blink starts

        // Phase 4: Reveal / Fade (at 3s)
        setTimeout(() => {
            flashWhite.classList.add('flash-active');
            introText.classList.add('text-reveal');
            
            // End Intro (at 4.5s)
            setTimeout(() => {
                endIntro();
            }, 1500);
        }, 1000);
    }, 2000);

    // Skip functionality
    skipBtn.addEventListener('click', () => {
        clearTimeout(sequence);
        endIntro();
    });

    function endIntro() {
        introOverlay.style.opacity = '0';
        document.body.style.overflow = '';
        localStorage.setItem('anubis_intro_seen', 'true');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.style.display = '';
        
        setTimeout(() => {
            introOverlay.remove();
        }, 500);
    }

    function removeIntro() {
        introOverlay.remove();
        document.body.style.overflow = '';
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.style.display = '';
    }
});
