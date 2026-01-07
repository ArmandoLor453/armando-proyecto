document.addEventListener('DOMContentLoaded', function() {
    // Animación de fade-in para todas las imágenes
    const images = document.querySelectorAll('.section-image, .header-image, img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
        img.style.transform = 'translateY(20px)';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
        
        // Si la imagen ya está cargada
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }
    });

    // Lazy loading con IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('visible');
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Animación para las tarjetas al hacer scroll
    const cards = document.querySelectorAll('.card, section');
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }

    // Smooth scroll para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
