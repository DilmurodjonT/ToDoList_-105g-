const $todoInput = document.querySelector("#form-add-input");
const $form = document.querySelector("#todolist-form");
const $taskContainer = document.querySelector("#task-container");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log($todoInput.value);
  const $taskMainElement = document.createElement("div");
  const $taskMainTitle = document.createElement("p");
  const $btnsWrapperElement = document.createElement("div");
  $taskMainTitle.innerText = $todoInput.value;
  $taskMainElement.appendChild($taskMainTitle);
  $taskMainElement.className = "task-item";
  $taskContainer.appendChild($taskMainElement);
  $btnsWrapperElement.className = "task-item__btn-wrapper";
  $btnsWrapperElement.innerHTML = `
  <button class="complete"> <i class="fas fa-circle-check"></i> <br> Complete </button>
  <button> <i class="fas fa-edit"></i> <br> Edit </button>
  <button> <i class="fas fa-clock"></i> <br> 9:41:10 </button>
  <button> <i class="fas fa-trash"></i> <br> Delete </button>
  `;
  $taskMainElement.appendChild($btnsWrapperElement);
  $todoInput.value = "";
});

$taskContainer.addEventListener("click", (e) => {
  if (e.target.className.includes("complete")) {
    e.target.parentElement.previousSibling.classList.toggle("completed");
  }
});
