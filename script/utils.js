import { containerElement, inputElement, tasksLeftElement, taskListElement } from "./element";
import { initTaskListeners } from "./eventListeners";

// themeToggle dark or light
export const themeToggle = () => {
  containerElement.classList.toggle("darkTheme");
  saveToDB("darkModeFlag", containerElement.classList.contains("darkTheme"));
};

// fetchData from DB
export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

// renderTaskList
export const renderTaskList = () => {
  const tasks = getFilteredTasks();
  let taskList = "";
  tasks.forEach((task) => {
    taskList += `<li class="wrapper__ul-elem ${task.isCompleted ? " checked" : ""}" data-id="${task.id}" draggable="true" >
              <button class="btn wrapper__ul-elem-check">
                <img src="images/icon-check.svg" alt="task checked" />
              </button>
              <p>${task.value}</p>
              <button class="btn wrapper__ul-elem-delete">
                <img src="images/icon-cross.svg" alt="delete task" />
              </button>
            </li>`;
  });

  taskListElement.innerHTML = taskList;
  inputElement.value = "";
};
// add a task
export const addTask = (e) => {
  e.preventDefault();

  const taskValue = inputElement.value;

  if (!taskValue) return;

  const task = {
    id: crypto.randomUUID(),
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData("tasks") || [];

  tasks.push(task);
  saveToDB("tasks", tasks);

  initTaskList(tasks);
  updateCounter();
};

// get task index by id
const getTaskIndexById = (taskId) => {
  const tasks = fetchData("tasks");

  return tasks.findIndex((task) => task.id === taskId);
};

// delete a task
export const deleteTask = (taskId) => {
  const answer = confirm("Are you sure you want to delete this task?");
  if (answer === false) return;

  const tasks = fetchData("tasks");
  const taskIndex = getTaskIndexById(taskId);

  if (taskIndex === -1) return;

  tasks.splice(taskIndex, 1);
  saveToDB("tasks", tasks);

  initTaskList(tasks);
  updateCounter();
};

// counts how many activeTasks in DB
export const updateCounter = () => {
  const tasks = fetchData("tasks") || [];
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  tasksLeftElement.textContent = `${activeTasks.length} task(s) left`;
};

// saveToDB
export const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// initDataOnStartup
export const initDataOnStartup = () => {
  fetchData("darkModeFlag") && themeToggle();
  initTaskList(fetchData("tasks"));
};

// renderEmptyState
const renderEmptyState = () => {
  taskListElement.innerHTML = ` <li class="wrapper__ul-EmptyList">
        <img src="./images/icon-empty.svg" alt="list is empty" class="EmptyList__img">
      </li>`;
};

// initTaskList
export const initTaskList = () => {
  const tasks = getFilteredTasks();
  if (tasks?.length) {
    renderTaskList();
    initTaskListeners();
  } else {
    renderEmptyState();
  }
};

// toggleTask
export const toggleTask = (taskId) => {
  const tasks = fetchData("tasks");
  const taskIndex = getTaskIndexById(taskId);

  if (taskIndex === -1) return;

  tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;

  saveToDB("tasks", tasks);

  initTaskList();
  updateCounter();
};

// filters
export const filterState = {
  current: "all",
};

const getFilteredTasks = () => {
  const tasks = fetchData("tasks") || [];

  switch (filterState.current) {
    case "active":
      return tasks.filter((task) => !task.isCompleted);

    case "completed":
      return tasks.filter((task) => task.isCompleted);

    default:
      return tasks;
  }
};

export const clearCompleted = () => {
  const tasks = fetchData("tasks") || [];

  const hasCompletedTasks = tasks.some((task) => task.isCompleted);
  if (!hasCompletedTasks) return;

  const answer = confirm("Are you sure you want to delete completed tasks?");
  if (!answer) return;

  const activeTasks = tasks.filter((task) => !task.isCompleted);

  saveToDB("tasks", activeTasks);

  initTaskList();
};

export const handleFilterKeydown = (e, radio, filter) => {
  if (e.key === "Enter") {
    radio.checked = true;
    filterState.current = filter;
    initTaskList();
  }
};

// drag and drop to redorder list
let draggedId = null;

export const handleDragStart = (e) => {
  draggedId = e.currentTarget.dataset.id;
};
export const handleDragOver = (e) => {
  e.preventDefault();
};

export const handleDrop = (e) => {
  e.preventDefault();

  const targetId = e.currentTarget.dataset.id;

  if (draggedId === targetId) return;

  const tasks = fetchData("tasks");

  const draggedIndex = tasks.findIndex((task) => task.id === draggedId);

  const targetIndex = tasks.findIndex((task) => task.id === targetId);

  const [draggedTask] = tasks.splice(draggedIndex, 1);

  tasks.splice(targetIndex, 0, draggedTask);

  saveToDB("tasks", tasks);

  initTaskList();
};
