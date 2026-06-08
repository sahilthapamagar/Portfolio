 // Scroll progress
        const progressBar = document.getElementById('progress-bar');
        window.addEventListener('scroll', () => {
            const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = Math.min(pct, 100) + '%';
        }, { passive: true });

        // Scroll to top
        const scrollTopBtn = document.getElementById('scroll-top');
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('hidden', window.scrollY < 400);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        // Active nav
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting)
                    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
            });
        }, { threshold: 0.4 }).observe && sections.forEach(s =>
            new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting)
                        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
                });
            }, { threshold: 0.35 }).observe(s)
        );

        // Reveal on scroll
        document.querySelectorAll('.reveal').forEach(el => {
            new IntersectionObserver(([entry], obs) => {
                if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
            }, { threshold: 0.1 }).observe(el);
        });

        // Hamburger
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        document.querySelectorAll('.mobile-link').forEach(l =>
            l.addEventListener('click', () => { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); })
        );

        // Typed text
        const texts = ['Full-Stack Web Developer', 'Laravel & PHP Specialist', 'IT Student & Learner', 'UI/UX Enthusiast'];
        let tIdx = 0, cIdx = 0, del = false;
        const typedEl = document.getElementById('typed-text');
        (function type() {
            const cur = texts[tIdx];
            if (del) {
                cIdx--;
                typedEl.textContent = cur.substring(0, cIdx);
                if (cIdx === 0) { del = false; tIdx = (tIdx + 1) % texts.length; setTimeout(type, 400); }
                else setTimeout(type, 45);
            } else {
                cIdx++;
                typedEl.textContent = cur.substring(0, cIdx);
                if (cIdx === cur.length) { del = true; setTimeout(type, 2000); }
                else setTimeout(type, 80);
            }
        })();

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id === '#') return;
                const t = document.querySelector(id);
                if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
            });
        });

        // CV download — fetch PDF as blob so it saves with the correct .pdf type
        document.querySelectorAll('a[href="assets/cv.pdf"]').forEach(btn => {
            btn.addEventListener('click', async e => {
                e.preventDefault();
                const fileName = btn.getAttribute('download') || 'Sahil_Thapa_CV.pdf';
                try {
                    const res = await fetch('assets/cv.pdf');
                    if (!res.ok) throw new Error('CV file not found');
                    const blob = new Blob([await res.arrayBuffer()], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName.endsWith('.pdf') ? fileName : fileName + '.pdf';
                    a.click();
                    URL.revokeObjectURL(url);
                } catch {
                    window.open('assets/cv.pdf', '_blank');
                }
            });
        });