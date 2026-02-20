/* ============================================
   MUNIZ & BRESSY — ASSESSORIA JURÍDICA
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==================== ANO DINÂMICO ====================
    const anoEl = document.getElementById('ano-atual');
    if (anoEl) anoEl.textContent = new Date().getFullYear();

    // ==================== HEADER SCROLL ====================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        header.style.boxShadow = window.scrollY > 50
            ? '0 4px 20px rgba(0,0,0,0.35)'
            : '0 2px 10px rgba(0,0,0,0.2)';
    });

    // ==================== MENU MOBILE (HAMBURGER) ====================
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');

    hamburger.addEventListener('click', function () {
        mainNav.classList.toggle('aberto');
    });

    // Fecha menu ao clicar em um link
    mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mainNav.classList.remove('aberto');
        });
    });

    // ==================== SCROLL SUAVE ====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==================== ANIMAÇÃO DE ENTRADA (CARDS + ANIM-CARD) ====================
    const animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.card, .anim-card, .dep-card').forEach(function (el) {
        animObserver.observe(el);
    });

    // ==================== FAQ ACCORDION ====================
    document.querySelectorAll('.faq-pergunta').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = this.closest('.faq-item');
            const resposta = item.querySelector('.faq-resposta');
            const isAberto = resposta.classList.contains('aberta');

            // Fecha todos
            document.querySelectorAll('.faq-resposta').forEach(function (r) {
                r.classList.remove('aberta');
            });
            document.querySelectorAll('.faq-pergunta').forEach(function (b) {
                b.classList.remove('ativo');
            });

            // Abre o clicado (se estava fechado)
            if (!isAberto) {
                resposta.classList.add('aberta');
                this.classList.add('ativo');
            }
        });
    });

    // ==================== FORMULÁRIO DE CONTATO ====================
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (res) {
                if (res.ok) {
                    btn.textContent = '✓ Mensagem enviada!';
                    btn.style.background = '#16a34a';
                    form.reset();
                    setTimeout(function () {
                        btn.textContent = 'Solicitar Consulta Gratuita →';
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3500);
                } else {
                    btn.textContent = 'Erro — tente novamente';
                    btn.style.background = '#dc2626';
                    btn.disabled = false;
                }
            }).catch(function () {
                btn.textContent = 'Erro — tente novamente';
                btn.style.background = '#dc2626';
                btn.disabled = false;
            });
        });
    }

});
