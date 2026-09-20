// ==================== DOCUMENT READY ====================
document.addEventListener('DOMContentLoaded', function() {

    // ==================== SCROLL TO TOP BUTTON ====================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('shadow');
            navbar.style.padding = '8px 0';
        } else {
            navbar.classList.remove('shadow');
            navbar.style.padding = '12px 0';
        }
    });

    // ==================== ADD TO CART FUNCTIONALITY ====================
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const cartBadge = document.querySelector('.cart-badge');
    let cartCount = 0;

    addToCartBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            cartBadge.textContent = cartCount;

            // Button animation
            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = '#28a745';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);

            // Cart badge animation
            cartBadge.style.transform = 'scale(1.4)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.category-item, .product-card, .feature-item, .review-card'
    );

    animateElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ==================== SMOOTH SCROLL FOR NAV LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==================== NEWSLETTER FORM ====================
    const subscribeBtn = document.querySelector('.btn-subscribe');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = this.previousElementSibling;
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                this.textContent = '✓ সাবস্ক্রাইব হয়েছে!';
                this.style.background = '#28a745';
                emailInput.value = '';

                setTimeout(() => {
                    this.textContent = 'সাবস্ক্রাইব';
                    this.style.background = '';
                }, 2500);
            } else {
                emailInput.style.borderColor = '#dc3545';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==================== CATEGORY CLICK EFFECT ====================
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.style.transform = '');
            this.style.transform = 'translateY(-10px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // ==================== PRODUCT CARD HOVER TILT ====================
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ==================== COUNTER ANIMATION FOR FEATURES ====================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ==================== LAZY LOAD IMAGES ====================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });

    // ==================== ACTIVE NAV LINK ON SCROLL ====================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    console.log(' Taraz Tea website loaded successfully!');
});