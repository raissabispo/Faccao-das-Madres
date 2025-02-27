document.getElementById('date').textContent = new Date().toLocaleDateString();


document.getElementById('logo-img').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});


document.getElementById('logo-img').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});


document.addEventListener('DOMContentLoaded', function() {
    const taskModal = document.getElementById('task-modal');
    const taskDetails = document.querySelector('.task-details');
    const taskForm = document.getElementById('task-form');
    const closeModal = document.querySelector('.close-modal');
    const deleteTaskButton = document.querySelector('.delete-task');
    let currentTask = null;


    function createTaskCard(taskData, taskId) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.draggable = true;
        card.dataset.taskId = taskId;
        card.dataset.quantidade = taskData.quantidade;
        card.dataset.costureira = taskData.costureira;
        card.dataset.entrega = taskData.entrega;
        card.innerHTML = `
            Costureira: ${taskData.costureira}<br>
            Prazo de entrega: ${taskData.entrega}<br>
            Quant. de peças: ${taskData.quantidade}
        `;
        return card;
    }


    function openTaskModal(task) {
        currentTask = task;
        if (task) {
            taskDetails.textContent = `Detalhes da Tarefa ${task.dataset.taskId}`;
            document.getElementById('quantidade').value = task.dataset.quantidade;
            document.getElementById('costureira').value = task.dataset.costureira;
            document.getElementById('entrega').value = task.dataset.entrega;
            deleteTaskButton.style.display = 'block';
        } else {
            taskDetails.textContent = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('costureira').value = '';
            document.getElementById('entrega').value = '';
            deleteTaskButton.style.display = 'none';
        }
        taskModal.style.display = 'block';
    }


    document.querySelectorAll('.column').forEach(column => {
        column.addEventListener('click', function(event) {
            if (event.target.classList.contains('card')) {
                openTaskModal(event.target);
            }
        });
    });


    document.querySelector('[data-status="pendente"] .add-task').addEventListener('click', function() {
        openTaskModal(null);
    });


    closeModal.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });


    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const quantidade = document.getElementById('quantidade').value;
        const costureira = document.getElementById('costureira').value;
        const entrega = document.getElementById('entrega').value;


        if (currentTask) {
            currentTask.dataset.quantidade = quantidade;
            currentTask.dataset.costureira = costureira;
            currentTask.dataset.entrega = entrega;
            currentTask.innerHTML = `
                Costureira: ${costureira}<br>
                Data: ${entrega}<br>
                Quant. de peças: ${quantidade}
            `;
        } else {
            const taskId = Date.now();
            const newTask = createTaskCard({ quantidade, costureira, entrega }, taskId);
            document.querySelector('[data-status="pendente"]').insertBefore(newTask, document.querySelector('[data-status="pendente"] .add-task'));
            addDragEventListeners(newTask);
        }


        taskModal.style.display = 'none';
        taskForm.reset();
        updateProgressBar();
    });


    deleteTaskButton.addEventListener('click', function() {
        if (currentTask) {
            currentTask.remove();
            taskModal.style.display = 'none';
            updateProgressBar();
        }
    });


    let draggedCard = null;


    function addDragEventListeners(card) {
        card.addEventListener('dragstart', function() {
            draggedCard = this;
        });
    }


    document.querySelectorAll('.card').forEach(addDragEventListeners);


    document.querySelectorAll('.column').forEach(column => {
        column.addEventListener('dragover', function(event) {
            event.preventDefault();
        });


        column.addEventListener('drop', function() {
            if (draggedCard) {
                this.insertBefore(draggedCard, this.querySelector('.add-task'));
                draggedCard = null;
                updateProgressBar();
                if (this.dataset.status === 'finalizada') {
                    updateRanking(); // Atualiza o ranking ao mover para "Finalizada"
                }
            }
        });
    });


    function updateProgressBar() {
        const totalCards = document.querySelectorAll('.card').length;
        const finishedCards = document.querySelectorAll('[data-status="finalizada"] .card').length;
        const percentage = totalCards > 0 ? (finishedCards / totalCards) * 100 : 0;


        document.querySelector('.progress-fill').style.width = percentage + '%';
        document.querySelector('.progress-percent').textContent = Math.round(percentage) + '%';
    }


    updateProgressBar();


    // Lógica do Ranking
    function updateRanking() {
        const finishedTasks = document.querySelectorAll('[data-status="finalizada"] .card');
        const costureiras = {};


        finishedTasks.forEach(task => {
            const costureira = task.dataset.costureira;
            const quantidade = parseInt(task.dataset.quantidade);


            if (costureiras[costureira]) {
                costureiras[costureira] += quantidade;
            } else {
                costureiras[costureira] = quantidade;
            }
        });


        const rankingArray = Object.entries(costureiras).map(([nome, pecas]) => ({ nome, pecas }));
        rankingArray.sort((a, b) => b.pecas - a.pecas);


        const rankingTableBody = document.querySelector('#ranking-table tbody');
        rankingTableBody.innerHTML = '';


        rankingArray.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}º</td>
                <td>${item.nome}</td>
                <td>${item.pecas}</td>
            `;
            rankingTableBody.appendChild(row);
        });
    }


    updateRanking(); // Carrega o ranking inicial
});

