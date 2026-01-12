document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELEÇÃO DE ELEMENTOS ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Elementos do Night Mode
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // --- 2. LÓGICA DO NIGHT MODE (Tema Escuro) ---

    // Verificar se o utilizador já tinha escolhido o modo escuro anteriormente
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Evento de clique para mudar o tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        
        // Se a classe dark-mode estiver ativa, muda o ícone para Sol e guarda a preferência
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            theme = 'dark';
        } else {
            // Caso contrário, volta para a Lua
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Guarda a escolha no navegador (LocalStorage)
        localStorage.setItem('theme', theme);
    });


    // --- 3. FUNCIONALIDADE DO MENU HAMBURGER ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Muda para ícone X
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Volta para hamburger
            }
        });
    }

    // --- 4. FECHAR MENU AO CLICAR NUM LINK ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
});