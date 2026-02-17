/* ============================================
   MUNIZ & BRESSY — ASSESSORIA JURÍDICA
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==================== SCROLL SUAVE NOS LINKS DE NAVEGAÇÃO ====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== HEADER: SOMBRA AO ROLAR ====================
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });

    // ==================== ANIMAÇÃO DE ENTRADA DOS CARDS ====================
    // O JS apenas adiciona a classe .visible — o CSS cuida de TUDO
    // Assim o hover de levantar o card funciona sem conflito
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(function (card) {
        observer.observe(card);
    });

    // ==================== ANO DINÂMICO NO COPYRIGHT ====================
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace(/\d{4}/, year);
    }

});
