const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("input-button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// --- СОХРАНЕНИЕ В localStorage ---
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- ЗАГРУЗКА ЗАДАЧ ПРИ СТАРТЕ СТРАНИЦЫ ---
function loadTasks() {
  tasks.forEach(function(task) {
    renderTask(task);
  });
  updateStats();
}

// --- РЕНДЕР ОДНОЙ ЗАДАЧИ В DOM ---
function renderTask(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.id = task.id;

  li.innerHTML = `
    <label class="task-label">
      <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} />
      <span class="task-text">${task.text}</span>
    </label>
    <div class="task-buttons">
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  if (task.completed) {
    li.classList.add("completed");
  }

  listContainer.appendChild(li);
  attachTaskEvents(li);
}

// --- ДОБАВЛЕНИЕ ЗАДАЧИ ---
function addTask() {
  const taskText = inputBox.value.trim();

  if (!taskText) {
    alert("Введи текст задачи!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
  updateStats();

  inputBox.value = "";
}

// --- СОБЫТИЯ ЗАДАЧИ ---
function attachTaskEvents(li) {
  const checkbox  = li.querySelector(".task-checkbox");
  const taskSpan  = li.querySelector(".task-text");
  const editBtn   = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  function getTask() {
    return tasks.find(t => t.id === Number(li.dataset.id));
  }

  // --- ЗАВЕРШЕНИЕ ---
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    getTask().completed = checkbox.checked; // обновляем объект в массиве
    saveTasks();
    updateStats();
  });

  // --- РЕДАКТИРОВАНИЕ ---
  editBtn.addEventListener("click", function () {
    const updated = prompt("Редактировать задачу:", taskSpan.textContent);
    if (updated !== null && updated.trim() !== "") {
      taskSpan.textContent = updated.trim();
      getTask().text = updated.trim();
      saveTasks();
      li.classList.remove("completed");
      checkbox.checked = false;
      getTask().completed = false;
      saveTasks();
      updateStats();
    }
  });

  // --- УДАЛЕНИЕ ---
  deleteBtn.addEventListener("click", function () {
    if (confirm("Удалить задачу?")) {
      tasks = tasks.filter(t => t.id !== Number(li.dataset.id));
      saveTasks();
      li.remove();
      updateStats();
    }
  });
}

addButton.addEventListener("click", addTask);

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
