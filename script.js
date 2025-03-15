var todos = {
  todo: [{ text: "Try to make a card", date: new Date(), status: "todo" }],
  inProgress: [
    { text: "Working on a card", date: new Date(), status: "inProgress" },
  ],
  done: [{ text: "Done with strig card", date: new Date(), status: "done" }],
};
let draggedCard = null;
function getTodosFromLocalStorage() {
  const localTodos = localStorage.getItem("todos");
  todos = JSON.parse(localTodos);
  mapTodos();
}

getTodosFromLocalStorage();

function addToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoCard(todo) {
  const card = document.createElement("div");
  card.className = "todoCard";
  card.draggable = true;

  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  const radioBtn = document.createElement("input");
  radioBtn.className = "radioBtn";
  radioBtn.type = "radio";

  const textNode = document.createTextNode(todo.text);

  card.appendChild(radioBtn);
  card.appendChild(textNode);

  document.getElementById(`${todo.status}Container`).appendChild(card);
}

function mapTodos() {
  // Object.keys(todos).forEach((key) => {
  //   console.log("key", key, todos[key]);
  // });
  todos?.forEach((todo) => {
    addTodoCard(todo);
  });
}

function addTodo(todo) {
  addTodoCard(todo);
  todos[todo.status].push(todo);
  addToLocalStorage();
}

function addTask(status) {
  if (!document.getElementById(`${status}Input`)) {
    const actionContainer = document.getElementById(`${status}ActionContainer`);
    const addButton = actionContainer.querySelector(".addButton");
    const input = createInputElement(status);
    actionContainer.insertBefore(input, addButton);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && input.value !== "") {
        todo = { text: input.value, date: new Date(), status: status };
        addTodo(todo);
        input.value = "";
      }
    });
  }
}

function createInputElement(status) {
  const input = document.createElement("input");
  input.type = "text";
  input.style.width = "100%";
  input.placeholder = `Add a new ${status} task`;
  input.id = `${status}Input`;
  input.className = `task-input`;
  return input;
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
