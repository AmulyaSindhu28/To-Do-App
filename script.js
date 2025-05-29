const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const value = taskInput.value.trim();
  if (!value) return;

  tasks.push({ text: value, completed: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    const span = document.createElement("span");
    span.textContent = task.text;

    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.onclick = () => toggleTask(index);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

renderTasks();
