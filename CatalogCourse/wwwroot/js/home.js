// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Пульсация кнопки
    const btn = document.querySelector('.btn');
    setInterval(() => {
        btn.style.animation = 'pulse 2s infinite';
        setTimeout(() => {
            btn.style.animation = '';
        }, 2000);
    }, 8000);
});