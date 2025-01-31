const form = document.querySelector("form");
const toDoInput = document.getElementById("toDoInput");
const taskContainer = document.getElementById("taskContainer");

let taskTab = JSON.parse(localStorage.getItem("tasks")) || []; // Charger les tâches depuis le localStorage

displayTask();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = toDoInput.value.trim();
  if (title) {
    addTask(title);
    toDoInput.value = "";
    displayTask();
  } else {
    alert("Veuillez entrer une tâche.");
  }
});

taskContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    handleClickTask(e);
  }
});

function addTask(title) {
  taskTab.push({
    id: Date.now(),
    title,
    isDone: false,
  });
  saveTasks();
}

function displayTask() {
  if (taskTab.length === 0) {
    taskContainer.innerHTML = `<h4>Aucune tâche à afficher</h4>`;
  } else {
    taskContainer.innerHTML = taskTab
      .map(
        (task) => `
        <li id="${task.id}" class="${task.isDone ? "done" : ""}">
          ${task.title}
        </li>`
      )
      .join("");
  }
}

function handleClickTask(e) {
  const taskId = parseInt(e.target.id, 10);
  if (isNaN(taskId)) return;

  const taskIndex = taskTab.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return;

  const task = taskTab[taskIndex];
  if (!task.isDone) {
    task.isDone = true;
    e.target.classList.add("done");
  } else {
    taskTab.splice(taskIndex, 1); // Supprime la tâche du tableau
    e.target.remove();
  }
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskTab)); // Convertir le tableau en JSON et le sauvegarder
}
