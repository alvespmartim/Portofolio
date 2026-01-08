document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos necessários do HTML
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 1. Funcionalidade do botão Hamburger (Abrir/Fechar)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Alternar a classe 'active' no menu para o mostrar/esconder (feito via CSS)
            navMenu.classList.toggle('active');
            
            // Alterna o ícone de bars (hamburger) para X
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Ícone X
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Fechar o menu após clicar num link (Útil em mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Se o menu estiver ativo, desativa
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Garante que o ícone volta a ser o hamburger
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
});