document.addEventListener('DOMContentLoaded', () => {
    
    // Remove old Loader if it still exists (fallback)
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1500); 
    }

    // 1. Render Menu Items
    const renderMenu = (categoryId, items) => {
        const container = document.getElementById(categoryId);
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="menu-card reveal" id="item-${item.id}">
                <img src="${item.image}" alt="${item.name} - Ancient Egyptian styled food" class="menu-image" loading="lazy">
                <div class="menu-content">
                    <div class="menu-header">
                        <h4 class="menu-title">${item.name}</h4>
                        <span class="menu-price">${item.price} EGP</span>
                    </div>
                    <p class="menu-desc">${item.description}</p>
                </div>
            </div>
        `).join('');
    };

    renderMenu('food-grid', menuData.food);
    renderMenu('drinks-grid', menuData.drinks);
    renderMenu('desserts-grid', menuData.desserts);

    // 2. Theme Switcher (Sun / Moon)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('anubis_theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('anubis_theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });



    // 4. Scroll Reveal Animations (Turning Papyrus Scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    setTimeout(() => {
        document.querySelectorAll('.reveal, .section-title').forEach(el => {
            observer.observe(el);
        });
    }, 1600); // After loader finishes
});
