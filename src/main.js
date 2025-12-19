document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Плавный скролл (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Мобильное меню (Безопасно)
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (burger && mobileMenu) {
        const toggleMenu = () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        burger.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // 4. GSAP Анимации для Hero
    if (document.querySelector('.hero__title')) {
        const title = new SplitType('.hero__title', { types: 'chars' });
        gsap.from(title.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out"
        });
    }

    // 5. Валидация формы и математическая капча
    const contactForm = document.getElementById('mainForm');
    if (contactForm) {
        const captchaLabel = document.getElementById('captchaLabel');
        const captchaInput = document.getElementById('captchaInput');
        
        let n1 = Math.floor(Math.random() * 10);
        let n2 = Math.floor(Math.random() * 5);
        let correctAnswer = n1 + n2;

        if (captchaLabel) captchaLabel.innerText = `Сколько будет ${n1} + ${n2}?`;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== correctAnswer) {
                alert('Ошибка проверки! Пожалуйста, решите пример.');
                return;
            }

            const btn = contactForm.querySelector('button');
            btn.disabled = true;
            btn.innerText = 'Отправка...';

            setTimeout(() => {
                contactForm.reset();
                document.getElementById('formSuccess').style.display = 'block';
                btn.innerText = 'Заявка отправлена';
            }, 1500);
        });
    }

    // 6. Плавное появление элементов при скролле (через CSS классы)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => observer.observe(section));
});