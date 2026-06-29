document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito no Cabeçalho ao Rolar
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 5%'; // Compacta levemente o menu
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '20px 5%';
        }
    });

    // 2. Rolagem Suave para os Links Internos
    const menuLinks = document.querySelectorAll('nav ul li a, .btn');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Verifica se o link é interno (começa com #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calcula a altura do header para não cobrir o topo da seção
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Menu Ativo Dinâmico (Destaque conforme a rolagem)
    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // margem de segurança
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || 'contato'; // 'contato' caso seja o footer
            }
        });

        navItems.forEach(a => {
            a.style.color = '#4a5568'; // Cor padrão do seu CSS
            if (a.getAttribute('href') === `#${currentSectionId}`) {
                a.style.color = '#2d6a4f'; // Cor de hover/ativa do seu CSS
            }
        });
    });
});
