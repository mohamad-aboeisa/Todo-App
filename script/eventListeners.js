import {
  activeBtn,
  activeRadio,
  allBtn,
  allRadio,
  clearCompletedBtn,
  completedBtn,
  completedRadio,
  getCheckBoxElements,
  getDeleteELements,
  getTaskElements,
  inputElementButton,
  themeToggleElement,
} from "./element";
import {
  addTask,
  clearCompleted,
  deleteTask,
  filterState,
  handleDragOver,
  handleDragStart,
  handleDrop,
  handleFilterKeydown,
  initTaskList,
  themeToggle,
  toggleTask,
} from "./utils";

export const initListeners = () => {
  themeToggleElement.addEventListener("click", themeToggle);
  inputElementButton.addEventListener("click", addTask);
};

export const initTaskListeners = () => {
  getDeleteELements().forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const taskId = e.currentTarget.closest(".wrapper__ul-elem").dataset.id;
      deleteTask(taskId);
    });
    icon.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const taskId = e.currentTarget.closest(".wrapper__ul-elem").dataset.id;
        deleteTask(taskId);
      }
    });
  });
  getCheckBoxElements().forEach((box) => {
    box.addEventListener("click", (e) => {
      const taskId = e.currentTarget.closest(".wrapper__ul-elem").dataset.id;
      toggleTask(taskId);
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const taskId = e.currentTarget.closest(".wrapper__ul-elem").dataset.id;
        toggleTask(taskId);
      }
    });
  });
  getTaskElements().forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("drop", handleDrop);
  });
};
export let initFiltersListeners = () => {
  allBtn.addEventListener("click", () => {
    filterState.current = "all";
    initTaskList();
  });
  allBtn.addEventListener("keydown", (e) => handleFilterKeydown(e, allRadio, "all"));
  activeBtn.addEventListener("click", () => {
    filterState.current = "active";
    initTaskList();
  });
  activeBtn.addEventListener("keydown", (e) => handleFilterKeydown(e, activeRadio, "active"));
  completedBtn.addEventListener("click", () => {
    filterState.current = "completed";
    initTaskList();
  });
  completedBtn.addEventListener("keydown", (e) => handleFilterKeydown(e, completedRadio, "completed"));
  clearCompletedBtn.addEventListener("click", clearCompleted);
};
