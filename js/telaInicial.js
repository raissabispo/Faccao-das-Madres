// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento de clique para os botões de login
    const btnCostureira = document.querySelector('.btn-costureira');
    const btnChefe = document.querySelector('.btn-chefe');

    btnCostureira.addEventListener('click', function() {
        // Redirecionamento para a página de costureira (se necessário)
        alert('Entrar como costureira (funcionalidade a ser implementada).');
    });

    btnChefe.addEventListener('click', function() {
        // Redirecionamento para a página de chefe (se necessário)
        alert('Entrar como chefe (funcionalidade a ser implementada).');
    });

    // Adiciona interatividade aos itens do menu (exemplo)
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#966155'; // Cor mais clara no hover
            this.style.transform = 'scale(1.05)'; // Aumenta o tamanho no hover
            this.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
        });

        item.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#B87A6D'; // Cor original
            this.style.transform = 'scale(1)'; // Tamanho original
            this.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
        });
    });
});