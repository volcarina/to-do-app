const profilePic       = document.getElementById("profile-pic");
const avatarUpload     = document.getElementById("avatar-upload");
const profileName      = document.getElementById("profile-name");
const profileEmail     = document.getElementById("profile-email");
const completedCount   = document.getElementById("completed-counter");
const uncompletedCount = document.getElementById("uncompleted-counter");


// --- СМЕНА ФОТО ---
avatarUpload.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (!file || !file.type.startsWith("image/")) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("Фото слишком большое. Выбери файл до 2MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    profilePic.src = e.target.result;
    localStorage.setItem("profilePic", e.target.result);
  };

  reader.readAsDataURL(file);
});


//  --- РЕДАКТИРОВАНИЕ ИМЕНИ И EMAIL ---
function makeEditable(element, storageKey) {
  element.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = element.textContent;
    input.className = "inline-edit";

    element.replaceWith(input);
    input.focus();
    input.select();

    function save() {
      const newValue = input.value.trim() || element.textContent;
      element.textContent = newValue;
      localStorage.setItem(storageKey, newValue);
      input.replaceWith(element);
    }

    input.addEventListener("blur", save);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") save();
      if (e.key === "Escape") input.replaceWith(element);
    });
  });
}


makeEditable(profileName, "profileName");
makeEditable(profileEmail, "profileEmail");


//  --- СТАТИСТИКА ---
function updateStats() {
  const completed   = document.querySelectorAll(".task-item.completed").length;
  const uncompleted = document.querySelectorAll(".task-item:not(.completed)").length;

  completedCount.textContent   = completed;
  uncompletedCount.textContent = uncompleted;

}

//  --- ЗАГРУЗКА СОХРАНЁННЫХ ДАННЫХ ---
function loadProfile() {
  const savedName  = localStorage.getItem("profileName");
  const savedEmail = localStorage.getItem("profileEmail");
  const savedPic   = localStorage.getItem("profilePic");

  if (savedName)  profileName.textContent  = savedName;
  if (savedEmail) profileEmail.textContent = savedEmail;
  if (savedPic)   profilePic.src           = savedPic;
}