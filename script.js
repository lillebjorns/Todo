// TOTAL REHAUL PÅ HELA JAVASCRIPTET FÖR DET FÖRRA BLEV EXTREMT FÖRVIRRANDE
// ny approach: metoder.

let todoInput = document.getElementById('input');
let itemList = document.getElementById('itemList');
let counterBox = document.querySelector('.counter-box');
let counter = document.getElementById('counter');
let AllButton = document.getElementById('AllButton');
let activeButton = document.getElementById('activeButton');
let completedButton = document.getElementById('completedButton');
let clearCompletedButton = document.getElementById('clearCompleted');
let selectAllButton = document.getElementById('selectAllButton');
let todoForm = document.getElementById('todoinput');

let todos = [];
renderTodos(); // första som händer när sidan läses in

function createTodoElement(todo, index) {
  const todoItem = document.createElement('li');
  const todoDiv = document.createElement('div');
  const toggleInput = document.createElement('input');
  const todoLabel = document.createElement('label');
  const destroyButton = document.createElement('button');

  todoItem.classList.add('todo-item');
  toggleInput.classList.add('toggle');
  destroyButton.classList.add('destroy');
  todoDiv.classList.add('tododiv');
  toggleInput.type = 'checkbox';
  toggleInput.checked = todo.completed;
  toggleInput.setAttribute('data-index', index);//index till för att manipulera rätt todo

  todoLabel.textContent = todo.text;

  destroyButton.setAttribute('data-index', index);//index till för att manipulera rätt todo
  destroyButton.textContent = '❌';

  todoDiv.appendChild(toggleInput);
  todoDiv.appendChild(todoLabel);
  todoDiv.appendChild(destroyButton);

  todoItem.appendChild(todoDiv);

  return todoItem;
}


function renderTodos() {

  while (itemList.firstChild) { // typ som 'state'
    itemList.removeChild(itemList.firstChild);
  }
  todos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    itemList.appendChild(todoElement);
  });

  updateCounter();
  toggleCounterBox();
  toggleClearCompletedButton();
}
function renderFilteredTodos(filteredTodos) { // samma som ovan fast med filtrerade todos som parameter

  while (itemList.firstChild) { // typ som 'state'
    itemList.removeChild(itemList.firstChild);
  }
  filteredTodos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    itemList.appendChild(todoElement);
  });

  updateCounter();
}

// räknare
function updateCounter() {
  const activeTodos = todos.filter(todo => !todo.completed).length;
  counter.textContent = `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`; // pluralsfix
  
}

// visa footern/counterbox metod
function toggleCounterBox() {
  if (todos.length > 0) {
    counterBox.style.display = 'flex';
    todoInput.style.boxShadow = 'none';
    selectAllButton.style.display='block';
    //lägg till så att pilen ändras här
  } else {
    counterBox.style.display = 'none';
    selectAllButton.style.boxShadow ='none';
  }
}

// lägg till todo 
todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    todoInput.value = '';
    renderTodos();
  }
});

// checkfunktionaliteten
itemList.addEventListener('change', function (event) {
  if (event.target.classList.contains('toggle')) {
    const index = event.target.dataset.index;
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }
  toggleClearCompletedButton();
});

// target:destroy.
itemList.addEventListener('click', function (event) {
  if (event.target.classList.contains('destroy')) {
    const index = event.target.dataset.index;
    todos.splice(index, 1);
    renderTodos();
  }
});
//knappfunktioner nedan
AllButton.addEventListener('click', function (event) {
  event.preventDefault();
  todos = [...todos];
  renderTodos();
});

activeButton.addEventListener('click', function (event) {
  event.preventDefault();
  const activeTodos = todos.filter(todo => !todo.completed);
  renderFilteredTodos(activeTodos);
});

completedButton.addEventListener('click', function (event) {
  event.preventDefault();
  const completedTodos = todos.filter(todo => todo.completed);
  renderFilteredTodos(completedTodos);
});

// rensar färdiga rackare
clearCompletedButton.addEventListener('click', function (event) {
  event.preventDefault();
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});
function toggleClearCompletedButton() {
  const anyCompleted = todos.some(todo => todo.completed);
  clearCompletedButton.style.opacity = anyCompleted ? 1 : 0;
}

selectAllButton.addEventListener('click', function (event) {
  let allCompleted = true;

  todos.forEach(todo => {
    if (!todo.completed) {// kollar om alla todos är checkade
      allCompleted = false;
      return; //hoppa ur loopen tidigt om inte checkad
    }
  });

  todos.forEach(todo => {
    if (allCompleted) {
      // checka ur allt om alla är checkade
      todo.completed = false;
    } else {
      // checka i de som inte är checkade
      if (!todo.completed) {
        todo.completed = true;
      }
    }
  });

  renderTodos();
});


