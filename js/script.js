const $todoInput = document.querySelector("#form-add-input");
const $form = document.querySelector("#todolist-form");
const $taskContainer = document.querySelector("#task-container");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log($todoInput.value);
  const $taskMainElement = document.createElement("div");
  const $taskMainTitle = document.createElement("p");
  $taskMainTitle.innerText = $todoInput.value;
  $taskMainElement.appendChild($taskMainTitle);
  $taskMainElement.className = "task-item";
  $taskContainer.appendChild($taskMainElement);
  $todoInput.value = "";
});
