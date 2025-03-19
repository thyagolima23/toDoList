const form = document.querySelector('form');
const inputText = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');

form.addEventListener('submit', (event) => {
    event.preventDefault(); //impede da página ser recarregada e perde tudo

    const taskTitle = inputText.value.trim(); //taskTitle recebe o que é digitado no input
    if (taskTitle.length < 3) {
        alert('Sua tarefa precisa ter pelo menos 3 letras');
        return;
    }
    const newTask = { text: taskTitle, done: false };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputText.value = '';
    loadTasks();
})
window.onload = loadTasks;

function loadTasks() { //carregar tarefas
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    ul.innerHTML = '';
    tasks.forEach( (task) => {
        const li = document.createElement('li');
        
        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.checked = task.done;
        inputCheckbox.addEventListener('change', (event) => {
            const liToggle = event.target.parentElement;
            const spanToggle = liToggle.querySelector('span');
            const done = event.target.checked
            
            if (!done) {
                spanToggle.style.textDecoration = 'none';
            } else {
                spanToggle.style.textDecoration = 'line-through';
            }
            task.done = done;
            saveTasks();
        });
        const span = document.createElement('span');
        span.textContent = task.text;
        if(task.done){
            span.style.textDecoration = 'line-through';
        }
       
        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.addEventListener('click', () => {
            removeTask(task);    
        });
        li.appendChild(inputCheckbox);
        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
    });

}
function saveTasks() {
    const tasks = [];
    const liElements = document.querySelectorAll('ul li'); //selecionar todas ul li
    liElements.forEach(li => {
        const span = li.querySelector('span')
        const checkbox = li.querySelector('input[type:"checkbox"]');
        tasks.push({
            text: span.textContent,
            done: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//função com parametro
//Remove tarefa
function removeTask(TaskRemove) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; //parse converte string para JSON
    const updateTasks = tasks.filter(task => task.text !== TaskRemove.text); //filtra a tarefa a ser removida
    localStorage.setItem('tasks', JSON.stringify(updateTasks)); //Atualiza o localStorage
    loadTasks();
}

//isso permite capturar quando clicar em adicionar ou aperta Enter
