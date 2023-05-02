document.getElementById("add-task").addEventListener("click", function() {
    const taskName = document.getElementById("task-name").value;
    if (taskName === '') return;
    const taskList = document.getElementById("task-list");

    const listItem = document.createElement("li");
		listItem.classList.add("flex-container");

    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskName;
    listItem.appendChild(taskLabel);

  	const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.classList.add("start");

		const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";
    stopBtn.classList.add("stop");

		const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(listItem);
    });
    listItem.appendChild(deleteBtn);

    let timer;
    let elapsedTime = 0;

    startBtn.addEventListener("click", function() {
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            const seconds = Math.floor(elapsedTime / 1000) % 60;
            const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
            const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
            taskLabel.textContent = `${taskName} - ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    });

    stopBtn.addEventListener("click", function() {
        clearInterval(timer);
    });
    
    listItem.appendChild(taskLabel);
    listItem.appendChild(startBtn);
    listItem.appendChild(stopBtn);
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);

    document.getElementById("task-name").value = '';
});
