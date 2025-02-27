// Atualizar a data
document.getElementById('date').textContent = new Date().toLocaleDateString();

// Animação do logo
document.getElementById('logo-img').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

document.getElementById('logo-img').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

// Atualizar a barra de progresso (exemplo)
function updateProgress(percent) {
    document.querySelector('.progress-fill').style.width = percent + '%';
    document.querySelector('.progress-percent').textContent = percent + '%';
}

// Chame a função updateProgress com a porcentagem desejada
updateProgress(70);