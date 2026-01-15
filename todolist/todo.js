const button = document.querySelector("button");
const input = document.querySelector("input");
const list = document.querySelector("ul");

// load saved tasks when page opens
window.onload = loadTasks;

button.addEventListener("click", addTask);

function addTask() {
    if (input.value === "") {
        alert("Please enter a task");
        return;
    }

    createTask(input.value);
    saveTasks();
    input.value = "";
}

function createTask(text, completed = false) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    if (completed) {
        span.classList.add("done");
    }

    span.addEventListener("click", function () {
        span.classList.toggle("done");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => createTask(task.text, task.completed));
}
