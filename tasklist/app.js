const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filterInput = document.getElementById('filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filterInput.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerText = task;

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);
    
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.innerText = taskInput.value;

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(link);
  
  taskList.appendChild(li);

  addTaskToLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

function addTaskToLocalStorage(input) {
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.push(input);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let filteredTasks;

  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();

    filteredTasks = tasks.filter(function(item) {
      return item !== e.target.parentElement.parentElement.innerText;
    });
  }

  if(e.target.parentElement.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.parentElement.remove();

    filteredTasks = tasks.filter(function(item) {
      return item !== e.target.parentElement.parentElement.parentElement.innerText;
    });
  }

  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !== -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}