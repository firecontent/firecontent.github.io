// ============================================
        // GLOBAL STATE
        // ============================================
        let currentLang = 'en';
        let isDarkTheme = true;
        let currentFilter = 'all';
        let currentModalIndex = 0;
        let filteredData = [];

        // ============================================
        // DOM ELEMENTS
        // ============================================
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuClose = document.getElementById('menuClose');
        const menuOverlay = document.getElementById('menuOverlay');
        const langButtons = document.querySelectorAll('.lang-btn');
        const langBtn = document.getElementById('langBtn');
        const themeBtn = document.getElementById('themeBtn');
        const header = document.getElementById('header');
        const loading = document.getElementById('loading');

        // ============================================
        // GALLERY DATA
        // ============================================
        const galleryData = [
            { type: 'photo', category: 'premium', src: './assets/images/id01-central-london-escort.JPG', thumb: './assets/images/id01-central-london-escort.JPG', title: 'Available Now!', description: 'Elegant companion in London' },
            { type: 'photo', category: 'premium', src: './assets/images/id02-paddington-private-flat-shemale-escort.JPEG', thumb: './assets/images/id02-paddington-private-flat-shemale-escort.JPEG', title: 'PADDINGTON PRIVATE', description: 'Discreet private flat' },
            { type: 'photo', category: 'premium', src: './assets/images/id03-shemale-kensigton-london.jpg', thumb: './assets/images/id03-shemale-kensigton-london.jpg', title: 'KENSINGTON EXCLUSIVE', description: 'Premium companion' },
            { type: 'video', category: 'exclusive', src: './video/id04-video-sexflix.mp4', poster: './assets/thumbnail/thumbnail-sexy.png', thumb: './assets/thumbnail/thumbnail-sexy.png', title: 'BIG DICK HARD', description: 'Brazilian TS With Big Dick' },
            { type: 'photo', category: 'premium', src: './assets/images/id05-escort-london-brazilian.jpg', thumb: './assets/images/id05-escort-london-brazilian.jpg', title: 'ELEGANT COMPANION', description: 'Refined escort service' },
            { type: 'video', category: 'exclusive', src: './video/id06-video-shemale-brazilian.mp4', poster: './assets/thumbnail/ts-with-big-dick.png', thumb: './assets/thumbnail/ts-with-big-dick.png', title: 'HORNY and HARD!', description: 'Lets meet now?' },
            { type: 'photo', category: 'exclusive', src: './assets/images/id07-milkpicture.png', thumb: './assets/images/id07-milkpicture.png', title: 'AUTHENTIC PHOTOS', description: 'Real verified photos' },
            { type: 'photo', category: 'premium', src: './assets/images/id08-real-photos-shemale-escort-paddington.jpeg', thumb: './assets/images/id08-real-photos-shemale-escort-paddington.jpeg', title: 'PADDINGTON PRIVATE', description: 'Private flat location' },
            { type: 'photo', category: 'exclusive', src: './assets/images/id09-shemale-london.jpeg', thumb: './assets/images/id09-shemale-london.jpeg', title: 'AUTHENTIC PHOTOS', description: 'Real verified photos' },
            { type: 'photo', category: 'exclusive', src: './assets/images/id10-private-flat-in-paddington.jpeg', thumb: './assets/images/id10-private-flat-in-paddington.jpeg', title: 'AUTHENTIC PHOTOS', description: 'Private flat Paddington' },
            { type: 'video', category: 'exclusive', src: './video/id11-boy-sucking-trans.mp4', poster: './assets/thumbnail/boy-sucking-ts.png', thumb: './assets/thumbnail/boy-sucking-ts.png', title: 'Oh YEAHH!', description: 'Premium video' },
            { type: 'photo', category: 'premium', src: './assets/images/id14-Glamorous-shemale-escort-in-Kensington-London–VanessaRafaella-TS.jpeg', thumb: './assets/images/id14-Glamorous-shemale-escort-in-Kensington-London–VanessaRafaella-TS.jpeg', title: 'KENSINGTON EXCLUSIVE', description: 'Premium companion' },
            { type: 'photo', category: 'exclusive', src: './assets/images/id15-vanessa-rafaella.jpeg', thumb: './assets/images/id15-vanessa-rafaella.jpeg', title: 'AUTHENTIC PHOTOS', description: 'Real verified photos' },
            { type: 'photo', category: 'exclusive', src: './assets/images/id16-vanessa-rafaella-london.jpeg', thumb: './assets/images/id16-vanessa-rafaella-london.jpeg', title: 'Meetings - Video call', description: 'Verified UK companion' },
            { type: 'photo', category: 'premium', src: './assets/images/id17-londonts.jpg', thumb: './assets/images/id17-londonts.jpg', title: 'LONDON LUXURY', description: 'Premium experience' },
            { type: 'photo', category: 'exclusive', src: './assets/images/id20-verified-london-shemale-escort-vanessa.jpeg', thumb: './assets/images/id20-verified-london-shemale-escort-vanessa.jpeg', title: 'VERIFIED ESCORT', description: 'London verified' },
        ];

        // ============================================
        // LOADING SCREEN
        // ============================================
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hide');
                renderGallery();
            }, 1000);
        });

        // ============================================
        // MOBILE MENU
        // ============================================
        function openMenu() {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        menuToggle.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu);

        // Close menu on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on ESC
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // ============================================
        // HEADER SCROLL EFFECT
        // ============================================
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // ============================================
        // LANGUAGE SWITCHER
        // ============================================
        function updateLanguage(lang) {
            currentLang = lang;
            
            document.querySelectorAll('[data-en][data-pt]').forEach(el => {
                const text = el.getAttribute(`data-${lang}`);
                if (text) el.textContent = text;
            });

            document.getElementById('currentLang').textContent = lang.toUpperCase();
            
            // Update desktop buttons
            langButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
        }

        // Desktop language buttons
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
        });

        // Mobile language button
        langBtn.addEventListener('click', () => {
            updateLanguage(currentLang === 'en' ? 'pt' : 'en');
        });

        // ============================================
        // THEME SWITCHER
        // ============================================
        themeBtn.addEventListener('click', () => {
            isDarkTheme = !isDarkTheme;
            document.body.classList.toggle('light-theme');
            
            const themeStatus = document.getElementById('themeStatus');
            const emoji = themeBtn.querySelector('.emoji');
            
            if (currentLang === 'en') {
                themeStatus.textContent = isDarkTheme ? 'Dark' : 'Light';
            } else {
                themeStatus.textContent = isDarkTheme ? 'Escuro' : 'Claro';
            }
            
            emoji.textContent = isDarkTheme ? '🌙' : '☀️';
        });