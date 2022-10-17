// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const select = document.querySelector(".filter-todo");

// Functions
const addTodo = (e) => {
  e.preventDefault();
  // DIV for todos
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Todo
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Save Todo in LocalStorage
  saveLocalTodos(todoInput.value);
  // Buttons
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // Attend to todoList
  todoList.appendChild(todoDiv);
  // Clear inputTodo
  todoInput.value = "";
};

const deleteAndCheck = (e) => {
  const item = e.target;

  // Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Complete Todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    console.log(todo.classList);
    todo.classList.toggle("completed");
    console.log(todo.classList);
  }
};

// Filter Todos
const filterTodos = (e) => {
  todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

function saveLocalTodos(todo) {
  // Check
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  // Check
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // DIV for todos
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Todo
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Buttons
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Attend to todoList
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  console.log(todoIndex)
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
select.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getTodos);