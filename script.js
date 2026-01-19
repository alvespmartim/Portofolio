document.addEventListener('DOMContentLoaded', () => { // Aguarda que o HTML seja totalmente carregado antes de executar o script
    // --- 1. SELEÇÃO DE ELEMENTOS ---
    const menuToggle = document.querySelector('.menu-toggle'); // Seleciona o botão do menu hambúrguer para mobile
    const navMenu = document.querySelector('.nav-menu'); // Seleciona o menu de navegação que contém a barra iOS
    const navLinks = document.querySelectorAll('.ios-item'); // Seleciona todos os links individuais do menu
    
    // Elementos do Night Mode
    const themeToggle = document.getElementById('theme-toggle'); // Seleciona o botão de alternância de tema
    const themeIcon = themeToggle.querySelector('i'); // Seleciona o ícone (Lua/Sol) dentro do botão de tema

    // --- 2. LÓGICA DO NIGHT MODE (Tema Escuro) ---

    // Verificar se o utilizador já tinha escolhido o modo escuro anteriormente
    const currentTheme = localStorage.getItem('theme'); // Procura no navegador se existe um tema guardado (light ou dark)
    if (currentTheme === 'dark') { // Verifica se o tema guardado é o modo escuro
        document.body.classList.add('dark-mode'); // Adiciona a classe de modo escuro ao corpo do documento
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Substitui o ícone da Lua pelo ícone do Sol
    }

    // Evento de clique para mudar o tema
    themeToggle.addEventListener('click', () => { // Adiciona um escutador de eventos para o clique no botão de tema
        document.body.classList.toggle('dark-mode'); // Alterna a presença da classe dark-mode no body
        
        let theme = 'light'; // Define, por padrão, o nome do tema como claro
        
        // Se a classe dark-mode estiver ativa, muda o ícone para Sol e guarda a preferência
        if (document.body.classList.contains('dark-mode')) { // Verifica se o modo escuro acabou de ser ativado
            themeIcon.classList.replace('fa-moon', 'fa-sun'); // Troca visualmente o ícone para o Sol
            theme = 'dark'; // Atualiza a variável para guardar "dark" no armazenamento
        } else { // Caso o utilizador tenha voltado para o modo claro
            // Caso contrário, volta para a Lua
            themeIcon.classList.replace('fa-sun', 'fa-moon'); // Troca visualmente o ícone para a Lua
        }
        
        // Guarda a escolha no navegador (LocalStorage)
        localStorage.setItem('theme', theme); // Grava permanentemente a escolha do utilizador no navegador
    });


    // --- 3. FUNCIONALIDADE DO MENU ---
    if (menuToggle) { // Verifica se o botão de menu existe na página atual
        menuToggle.addEventListener('click', () => { // Escuta o clique para abrir ou fechar o menu mobile
            navMenu.classList.toggle('active'); // Alterna a classe que mostra/esconde o menu lateral/superior
            
            const icon = menuToggle.querySelector('i'); // Obtém o ícone atual do botão de menu
            if (navMenu.classList.contains('active')) { // Se o menu estiver visível
                icon.classList.remove('fa-bars'); // Remove as barras do hambúrguer
                icon.classList.add('fa-times'); // Adiciona o ícone de fechar (X)
            } else { // Se o menu estiver escondido
                icon.classList.remove('fa-times'); // Remove o ícone de fechar
                icon.classList.add('fa-bars'); // Adiciona novamente o ícone hambúrguer
            }
        });
    }

    // --- 4. GESTÃO DE CLIQUES NO MENU (ESTILO iOS) ---
    navLinks.forEach(link => { // Percorre cada link do menu iOS individualmente
        link.addEventListener('click', () => { // Adiciona evento de clique a cada item do menu
            // Lógica de "Seleção" (Visual da Cápsula)
            navLinks.forEach(item => item.classList.remove('active')); // Remove o destaque de todos os outros links
            link.classList.add('active'); // Aplica o destaque (cápsula ativa) apenas no link clicado

            // Fechar menu mobile ao clicar num link
            if (navMenu.classList.contains('active')) { // Verifica se o menu mobile está aberto no momento
                navMenu.classList.remove('active'); // Fecha o menu automaticamente após o clique
                
                const icon = menuToggle.querySelector('i'); // Acede ao ícone do botão de menu mobile
                icon.classList.remove('fa-times'); // Remove o ícone de fechar
                icon.classList.add('fa-bars'); // Repõe o ícone das barras iniciais
            }
        });
    });

    // --- 5. ANIMAÇÕES AO FAZER SCROLL (PROJETOS E SKILLS) ---
    const observerOptions = { // Define as configurações para o observador de scroll
        threshold: 0.15 // Define que a animação dispara quando 15% do elemento entra no ecrã
    };

    const scrollObserver = new IntersectionObserver((entries) => { // Cria o observador que deteta elementos visíveis
        entries.forEach(entry => { // Analisa cada elemento que está a ser observado
            if (entry.isIntersecting) { // Verifica se o elemento entrou na área visível do navegador
                // Adiciona a classe .show que dispara as animações definidas no CSS
                entry.target.classList.add('show'); // Aplica a classe CSS que executa o movimento de entrada
                // Para de observar o elemento após a animação acontecer uma vez
                scrollObserver.unobserve(entry.target); // Deixa de monitorizar o elemento para poupar performance
            }
        });
    }, observerOptions); // Fecha a configuração do IntersectionObserver

    // Selecionar e observar Cartões de Projeto (Deslizam para a direita)
    const projectCards = document.querySelectorAll('.project-card'); // Captura todos os blocos de projetos do HTML
    projectCards.forEach(card => { // Percorre cada cartão de projeto encontrado
        scrollObserver.observe(card); // Diz ao observador para vigiar este cartão de projeto
    });

    // Selecionar e observar Itens de Skills (Deslizam de cima para baixo)
    const skillItems = document.querySelectorAll('.skill-item'); // Captura todos os blocos de competências do HTML
    skillItems.forEach(item => { // Percorre cada item da lista de competências
        scrollObserver.observe(item); // Diz ao observador para vigiar esta skill específica
    });
}); // Fecha o bloco principal de carregamento do documento