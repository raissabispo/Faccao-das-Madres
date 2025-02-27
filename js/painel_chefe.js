// Atualizar a data
document.getElementById('date').textContent = new Date().toLocaleDateString();

// Animação do logo
document.getElementById('logo-img').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

document.getElementById('logo-img').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (seu código JavaScript existente) ...

    const taskModal = document.getElementById('task-modal');
    const taskDetails = document.querySelector('.task-details');
    const taskForm = document.getElementById('task-form');
    const closeModal = document.querySelector('.close-modal');
    const deleteTaskButton = document.querySelector('.delete-task');
    let currentTask = null;

    // Abrir modal ao clicar em um card
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.dataset.taskId;
            currentTask = this;
            taskDetails.textContent = `Detalhes da Tarefa ${taskId}`;
            taskModal.style.display = 'block';
        });
    });

    // Abrir modal para adicionar tarefa (somente na coluna "Pendente")
    document.querySelector('[data-status="pendente"] .add-task').addEventListener('click', function() {
        currentTask = null;
        taskDetails.textContent = '';
        taskModal.style.display = 'block';
    });

    // Fechar modal
    closeModal.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });

    // Salvar informações da tarefa
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const quantidade = document.getElementById('quantidade').value;
        const costureira = document.getElementById('costureira').value;
        const entrega = document.getElementById('entrega').value;

        if (currentTask) {
            currentTask.textContent = `Tarefa ${currentTask.dataset.taskId} - ${quantidade} peças`;
        } else {
            const newTask = document.createElement('div');
            newTask.classList.add('card');
            newTask.textContent = `Nova Tarefa - ${quantidade} peças`;
            document.querySelector('[data-status="pendente"]').insertBefore(newTask, document.querySelector('[data-status="pendente"] .add-task'));
        }

        taskModal.style.display = 'none';
        taskForm.reset();
    });

    // Excluir tarefa
    deleteTaskButton.addEventListener('click', function() {
        if (currentTask) {
            currentTask.remove();
            taskModal.style.display = 'none';
        }
    });

    // Permitir arrastar e soltar cards
    let draggedCard = null;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('dragstart', function() {
            draggedCard = this;
        });
    });

    document.querySelectorAll('.column').forEach(column => {
        column.addEventListener('dragover', function(event) {
            event.preventDefault();
        });

        column.addEventListener('drop', function() {
            if (draggedCard) {
                this.appendChild(draggedCard);
                draggedCard = null;
            }
        });
    });
      //deixar a barra interativa
    function updateProgressBar() {
        const totalCards = document.querySelectorAll('.card').length;
        const finishedCards = document.querySelectorAll('[data-status="finalizada"] .card').length;
        const percentage = totalCards > 0 ? (finishedCards / totalCards) * 100 : 0;

        document.querySelector('.progress-fill').style.width = percentage + '%';
        document.querySelector('.progress-percent').textContent = Math.round(percentage) + '%';
    }

    // Atualizar barra de progresso ao carregar a página
    updateProgressBar();

    // Atualizar barra de progresso ao mover cards
    document.querySelectorAll('.column').forEach(column => {
        column.addEventListener('drop', function() {
            updateProgressBar();
        });
    });

    // Atualizar barra de progresso ao excluir tarefa
    deleteTaskButton.addEventListener('click', function() {
        if (currentTask) {
            currentTask.remove();
            taskModal.style.display = 'none';
            updateProgressBar();
        }
    });

    // Atualizar barra de progresso ao salvar tarefa
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // ... (seu código de salvar tarefa) ...
        updateProgressBar();
    });
});

// Atualizar a barra de progresso (exemplo)
function updateProgress(percent) {
    document.querySelector('.progress-fill').style.width = percent + '%';
    document.querySelector('.progress-percent').textContent = percent + '%';
}

// Chame a função updateProgress com a porcentagem desejada
updateProgress(70);