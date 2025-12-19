document.addEventListener('DOMContentLoaded', () => {
    // 1. Иконки
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 2. Плавный скролл
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 3. Мобильное меню
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    if (burger && mobileMenu) {
        const toggleMenu = () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };
        burger.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // 4. GSAP Hero Анимация (С фиксом слов)
    if (document.querySelector('.hero__title')) {
        const heroTitle = new SplitType('.hero__title', { types: 'words,chars' });
        gsap.from(heroTitle.chars, {
            opacity: 0,
            y: 30,
            stagger: 0.02,
            duration: 1,
            ease: "power3.out"
        });
    }

    // 5. Форма и Капча
    const form = document.getElementById('mainForm');
    if (form) {
        const captchaLabel = document.getElementById('captchaLabel');
        const captchaInput = document.getElementById('captchaInput');
        let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 5);
        let ans = n1 + n2;
        if (captchaLabel) captchaLabel.innerText = `Сколько будет ${n1} + ${n2}?`;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== ans) {
                alert('Капча введена неверно!');
                return;
            }
            const btn = form.querySelector('button');
            btn.innerText = 'Отправка...';
            setTimeout(() => {
                form.reset();
                document.getElementById('formSuccess').style.display = 'block';
                btn.innerText = 'Отправлено';
            }, 1500);
        });
    }

    // 6. Cookie Popup
    const cp = document.getElementById('cookiePopup');
    const ca = document.getElementById('acceptCookies');
    if (cp && !localStorage.getItem('trilo_cookies')) {
        setTimeout(() => cp.classList.add('active'), 2500);
    }
    if (ca) {
        ca.addEventListener('click', () => {
            localStorage.setItem('trilo_cookies', 'true');
            cp.classList.remove('active');
        });
    }
});