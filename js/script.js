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
