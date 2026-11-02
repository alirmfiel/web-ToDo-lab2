document.title = "To-Do List";

const stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = "../css/style.css";
document.head.append(stylesheet);

const viewport = document.createElement("meta");
viewport.name = "viewport";
viewport.content = "width=device-width, initial-scale=1.0";
document.head.append(viewport);

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "../images/favicon.svg";
document.head.append(favicon);

const header = document.createElement("header");

const heading = document.createElement("h1");
heading.textContent = "Мои задачи";

const currentMonth = document.createElement("h2");
currentMonth.className = "current-month";

header.append(heading, currentMonth);

const main = document.createElement("main");

const calendar = document.createElement("section");
calendar.className = "calendar";

const week = document.createElement("div");
week.className = "week";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

weekDays.forEach(day => {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";

    const dayName = document.createElement("span");
    dayName.textContent = day;

    const dayNumber = document.createElement("span");
    dayNumber.className = "day-number";

    dayElement.append(dayName, dayNumber);
    week.append(dayElement);
});

calendar.append(week);

const formSection = document.createElement("section");
formSection.className = "form-section";

const formHeading = document.createElement("h2");
formHeading.textContent = "Добавить задачу";

const taskForm = document.createElement("form");
taskForm.id = "task-form";

const taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.id = "task-input";
taskInput.placeholder = "Название задачи";
taskInput.required = true;

const dateInput = document.createElement("input");
dateInput.type = "date";
dateInput.id = "date-input";

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "Добавить";

taskForm.append(taskInput, dateInput, addButton);
formSection.append(formHeading, taskForm);

const tasksSection = document.createElement("section");
tasksSection.className = "tasks-section";

const tasksHeading = document.createElement("h2");
tasksHeading.textContent = "Список задач";

const filters = document.createElement("div");
filters.className = "filters";

const searchInput = document.createElement("input");
searchInput.type = "search";
searchInput.id = "search-input";
searchInput.placeholder = "Поиск по названию";

const searchDate = document.createElement("input");
searchDate.type = "date";
searchDate.id = "search-date";
searchDate.setAttribute("aria-label", "Поиск по дате");

const statusFilter = document.createElement("select");
statusFilter.id = "status-filter";

const statuses = [
    ["all", "Все задачи"],
    ["active", "Активные"],
    ["completed", "Выполненные"]
];

statuses.forEach(status => {
    const option = document.createElement("option");
    option.value = status[0];
    option.textContent = status[1];
    statusFilter.append(option);
});

const sortSelect = document.createElement("select");
sortSelect.id = "sort-select";

const sortOptions = [
    ["manual", "Мой порядок"],
    ["asc", "Сначала ранние"],
    ["desc", "Сначала поздние"]
];

sortOptions.forEach(sort => {
    const option = document.createElement("option");
    option.value = sort[0];
    option.textContent = sort[1];
    sortSelect.append(option);
});

filters.append(searchInput, searchDate, statusFilter, sortSelect);

const taskList = document.createElement("ul");
taskList.id = "task-list";

const emptyMessage = document.createElement("p");
emptyMessage.id = "empty-message";
emptyMessage.textContent = "Пока нет задач";

tasksSection.append(tasksHeading, filters, taskList, emptyMessage);

main.append(calendar, formSection, tasksSection);
document.body.append(header, main);


const today = new Date();

const months = [
    "январь", "февраль", "март", "апрель",
    "май", "июнь", "июль", "август",
    "сентябрь", "октябрь", "ноябрь", "декабрь"
];

currentMonth.textContent = `${months[today.getMonth()]} ${today.getFullYear()}`;

const monday = new Date(today);
monday.setDate(today.getDate() - (today.getDay() + 6) % 7);

const calendarDays = document.querySelectorAll(".calendar-day");

calendarDays.forEach((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    const number = day.querySelector(".day-number");
    number.textContent = date.getDate();

    if (date.toDateString() === today.toDateString()) {
        day.classList.add("active");
    }
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function renderTasks() {
    taskList.replaceChildren();

    const searchText = searchInput.value.trim().toLowerCase();
    const selectedDate = searchDate.value;
    const selectedStatus = statusFilter.value;
    const selectedSort = sortSelect.value;

    let filteredTasks = tasks.filter(task => {
        const matchesTitle = task.title.toLowerCase().includes(searchText);
        const matchesDate = !selectedDate || task.date === selectedDate;

        let matchesStatus = true;

        if (selectedStatus === "active") {
            matchesStatus = !task.completed;
        }

        if (selectedStatus === "completed") {
            matchesStatus = task.completed;
        }

        return matchesTitle && matchesDate && matchesStatus;
    });

    if (selectedSort === "asc") {
        filteredTasks.sort((a, b) => {
            return (a.date || "9999-12-31").localeCompare(b.date || "9999-12-31");
        });
    }

    if (selectedSort === "desc") {
        filteredTasks.sort((a, b) => {
            return (b.date || "0000-01-01").localeCompare(a.date || "0000-01-01");
        });
    }

    emptyMessage.hidden = filteredTasks.length > 0;

    filteredTasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task-item";
        item.dataset.id = task.id;

        if (task.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        const date = document.createElement("span");
        date.className = "task-date";
        date.textContent = task.date || "Без даты";

        info.append(title, date);

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Изменить";
        editButton.className = "edit-button";

        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, info, editButton, deleteButton);
        taskList.append(item);
    });
}

function editTask(id) {
    const task = tasks.find(item => item.id === id);

    if (!task) {
        return;
    }

    const item = Array.from(taskList.children).find(element => {
        return element.dataset.id === id;
    });

    if (!item) {
        return;
    }

    const form = document.createElement("form");
    form.className = "edit-form";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = task.title;
    titleInput.required = true;
    titleInput.maxLength = 120;

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = task.date || "";

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Сохранить";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Отмена";

    cancelButton.addEventListener("click", () => {
        renderTasks();
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const title = titleInput.value.trim();

        if (!title) {
            return;
        }

        task.title = title;
        task.date = dateInput.value;

        saveTasks();
        renderTasks();
    });

    form.append(titleInput, dateInput, saveButton, cancelButton);
    item.replaceChildren(form);
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = taskInput.value.trim();
    const date = dateInput.value;

    if (!title) {
        return;
    }

    const task = {
        id: crypto.randomUUID(),
        title: title,
        date: date,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

renderTasks();


searchInput.addEventListener("input", renderTasks);

searchDate.addEventListener("change", renderTasks);

statusFilter.addEventListener("change", renderTasks);

sortSelect.addEventListener("change", renderTasks);
