var todos = {
  todo: [
    {
      text: "➕ Add a new task by click on add task",
      date: new Date(),
      status: "todo",
    },
    {
      text: "🖱️ Drag me to another column to move tasks",
      date: new Date(),
      status: "todo",
    },
  ],
  inProgress: [
    {
      text: "⏳ Currently working on this task—try editing or moving me!",
      date: new Date(),
      status: "inProgress",
    },
    {
      text: "✅ Drop & Sort is in progress",
      date: new Date(),
      status: "inProgress",
    },
  ],
  done: [
    {
      text: "✅ Drag & Drop works! This task has been moved to Done",
      date: new Date(),
      status: "done",
    },
  ],
};

let draggedCard = null;

function getTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  renderTodos();
}

getTodosFromLocalStorage();

// Render all todos in their respective containers
function renderTodos() {
  Object.keys(todos).forEach((status) => {
    const container = document.getElementById(`${status}Container`);
    container.innerHTML = "";
    todos[status].forEach(createTodoCard);
  });
}

function addToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoCard(todo) {
  const card = document.createElement("div");
  card.className = "todoCard";
  card.draggable = true;

  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  // const radioBtn = document.createElement("input");
  // radioBtn.className = "radioBtn";
  // radioBtn.type = "radio";

  const textNode = document.createTextNode(todo.text);

  // card.appendChild(radioBtn);
  card.appendChild(textNode);

  document.getElementById(`${todo.status}Container`).appendChild(card);
}

function addTodo(todo) {
  createTodoCard(todo);
  todos[todo.status].push(todo);
  addToLocalStorage();
}

function addTask(status) {
  let inputField = document.getElementById(`${status}Input`);

  if (!inputField) {
    // Create input field if it doesn't exist
    const actionContainer = document.getElementById(`${status}ActionContainer`);
    const addButton = actionContainer.querySelector(".addButton");
    const inputDiv = createInputElement(status);
    actionContainer.insertBefore(inputDiv, addButton);
    inputField = inputDiv.querySelector("input");

    // Listen for "Enter" key to add task
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleTaskAddition(inputField, status);
    });

    inputField.focus();
  } else {
    handleTaskAddition(inputField, status);
  }
}

function handleTaskAddition(inputField, status) {
  if (inputField.value.trim() !== "") {
    addTodo({ text: inputField.value.trim(), date: new Date(), status });
    inputField.value = "";
    inputField.focus();
  }
}

function createInputElement(status) {
  const actionDiv = document.createElement("div");
  actionDiv.style.display = "flex";

  // Create input field
  const input = document.createElement("input");
  input.type = "text";
  input.style.flex = "1"; // Adjust width dynamically
  input.placeholder = `Add a new ${status} task`;
  input.id = `${status}Input`;
  input.className = "task-input";

  // Create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "X";
  cancelButton.style.marginLeft = "5px";
  cancelButton.className = "cancelButton";

  cancelButton.addEventListener("click", () => {
    cancelButton.remove();
    input.remove();
  });

  actionDiv.appendChild(input);
  actionDiv.appendChild(cancelButton);

  return actionDiv;
}

function dragStart() {
  this.classList.add("dragging");
  draggedCard = this;
}
function dragEnd() {
  this.classList.remove("dragging");
}
function dragOver() {
  this.classList.add("dragging");
  draggedCard = null;
}

const boards = document.querySelectorAll(".tasksContainer");
boards.forEach((board) => {
  board.addEventListener("dragover", dragOver);
});

function dragOver(event) {
  event.preventDefault();
  this.appendChild(draggedCard);
}
