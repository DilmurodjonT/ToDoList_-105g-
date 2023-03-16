const $todoInput = document.querySelector("#form-add-input");
const $form = document.querySelector("#todolist-form");
const $taskContainer = document.querySelector("#task-container");
const $deleteAllBtn = document.querySelector("#delete-all-btn");
const $deleteNotification = document.querySelector("#delete-notification");
const $cancelDeletingBtn = document.querySelector("#cancel-deleting");
const $secondsText = document.querySelector("#seconds");

disableBtn();

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($todoInput.value.trim().length > 1) {
    //   console.log($todoInput.value);
    const time = new Date();
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
  <button class="edit"> <i class="fas fa-edit"></i> <br> Edit </button>
  <button> <i class="fas fa-clock"></i> <br> 
  ${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${time
      .getSeconds()
      .toString()
      .padStart(2, "0")} </button>
  <button class="delete"> <i class="fas fa-trash"></i> <br> Delete </button>
  `;
    $taskMainElement.appendChild($btnsWrapperElement);
    $todoInput.value = "";
    disableBtn();
  }
});

$taskContainer.addEventListener("click", (e) => {
  if (e.target.className == "complete") {
    e.target.parentElement.previousSibling.classList.toggle("completed");
  } else if (e.target.className == "delete") {
    document.querySelectorAll(".remove-item").forEach((i) => {
      i.remove();
    });
    e.target.closest(".task-item").classList.add("remove-item");
    $deleteNotification.style.bottom = "22%";
    let defaultSeconds = 5;
    let time5seconds = setInterval(() => {
      $secondsText.innerHTML =
        defaultSeconds - 1 + `${defaultSeconds >= 3 ? " seconds" : " second"}`;
      defaultSeconds = defaultSeconds - 1;
    }, 1000);
    let timeForDeleting = setTimeout(() => {
      e.target.closest(".task-item").remove();
      $deleteNotification.style.bottom = "-100%";
      clearInterval(time5seconds);
    }, 5000);
    $cancelDeletingBtn.addEventListener("click", () => {
      clearTimeout(timeForDeleting);
      e.target.closest(".task-item").classList.remove("remove-item");
      $deleteNotification.style.bottom = "-100%";
    });
    disableBtn();
  } else if (e.target.className == "edit") {
    // console.log("bosildi");
    if (
      e.target.parentElement.previousSibling.hasAttribute("contenteditable")
    ) {
      e.target.parentElement.previousSibling.removeAttribute("contenteditable");
      e.target.parentElement.previousSibling.classList.remove("changing");
      e.target.innerHTML = '<i class="fas fa-edit"></i> <br> Edit';
      e.target.style.background = "gold";
    } else {
      e.target.parentElement.previousSibling.setAttribute(
        "contenteditable",
        true
      );
      e.target.parentElement.previousSibling.classList.add("changing");
      e.target.innerHTML = '<i class="fas fa-check-double"></i> <br> Done';
      e.target.style.background = "purple";
    }
  }
});

$deleteAllBtn.addEventListener("click", () => {
  const isAgreedToDelete = confirm(
    "Siz hammasini tozalab tashlashga rozimisiz?"
  );
  if (isAgreedToDelete) {
    $taskContainer.innerHTML = "";
    // DOM dan o'chirishni profisanal usuli bunaqa buladi
    // while ($taskContainer.firstChild) {
    //   $taskContainer.removeChild($taskContainer.firstChild)
    // }
  }
  disableBtn();
});

function disableBtn() {
  console.log($taskContainer.children);
  setTimeout(() => {
    if ($taskContainer.children.length == 0) {
      $deleteAllBtn.setAttribute("disabled", true);
      // console.log($deleteAllBtn.setAttribute("disabled", true));
    } else {
      $deleteAllBtn.removeAttribute("disabled");
    }
  }, 301);
}
