document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        return; // Do nothing if input is empty
    }

    let tasks = getTasksFromStorage();
    tasks.push(taskText);
    saveTasksToStorage(tasks);

    taskInput.value = '';
    renderTasks();
}

function removeTask(index) {
    let tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    renderTasks();
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let tasks = getTasksFromStorage();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="removeTask(${index})">Remove</button>`;
        taskList.appendChild(li);
    });
}

function loadTasks() {
    renderTasks();
}
