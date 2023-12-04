document.getElementById("add-task").addEventListener("click", function() {
  const taskName = document.getElementById("task-name").value;
  if (taskName === '') return;
  addTaskToList(taskName, 0);
  localStorage.setItem(taskName, 0);
});

function addTaskToList(taskName, initialElapsedTime) {
  const taskList = document.getElementById("task-list");
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");

  const taskLabel = document.createElement("span");
  taskLabel.textContent = taskName;
  listItem.appendChild(taskLabel);

  let elapsedTime = initialElapsedTime;

const startBtn = document.createElement("button");
startBtn.textContent = "Start";
let timer;
let startTime;

startBtn.addEventListener("click", function() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    taskLabel.textContent = `${taskName} - ${formatTime(elapsedTime)}`;
  }, 1000);
});
listItem.appendChild(startBtn);

const stopBtn = document.createElement("button");
stopBtn.textContent = "Stop";
stopBtn.addEventListener("click", function() {
  clearInterval(timer);
  localStorage.setItem(taskName, elapsedTime);
});
listItem.appendChild(stopBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", function() {
      localStorage.removeItem(taskName);
      taskList.removeChild(listItem);
  });
  listItem.appendChild(deleteBtn);

  taskList.appendChild(listItem);
}

function loadTasksFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
      const taskName = localStorage.key(i);
      const elapsedTime = parseInt(localStorage.getItem(taskName), 10);
      addTaskToList(taskName, elapsedTime);
  }
}

function formatTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

loadTasksFromLocalStorage();
