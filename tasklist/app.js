const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filterInput = document.getElementById('filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
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

  taskInput.value = '';

  e.preventDefault();
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
  }

  if(e.target.parentElement.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.parentElement.remove();
  }
}