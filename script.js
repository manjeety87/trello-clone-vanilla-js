const todos = [];
let currentTodo = "";

const addTodo = (todo = "This is a new todo") => {
  const card = document.createElement("div");
  card.className = "todoCard";

  const radioBtn = document.createElement("input");
  radioBtn.className = "radioBtn";
  radioBtn.type = "radio";

  const textNode = document.createTextNode(todo);

  card.appendChild(radioBtn);
  card.appendChild(textNode);

  document.getElementById("todoContainer").appendChild(card);
};

const addMap = () => {
  if (!document.getElementById("todoInput")) {
    const input = document.createElement("input");
    input.type = "text";
    input.width = "100px";
    input.placeholder = "Add a new todo";
    input.id = "todoInput";
    const actionContainer = document.getElementById("actionContainer");
    const addButton = actionContainer.querySelector(".addButton");
    actionContainer.insertBefore(input, addButton);
    input.addEventListener("keypress", (e) => {
      console.log("input.value", input.value);
      currentTodo = input.value;
      if (e.key === "Enter") {
        addTodo(currentTodo);
        input.value = "";
      }
    });
  }
};
