# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://mohamad-aboeisa.github.io/Todo-App/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Desktop-first workflow
- Javascript
- [Styled Components](https://styled-components.com/) - For styles

### What I learned

I learned how to handle darktheme using css variables, handling filters using radio button and labels and handling drag and drop to reorder was a challenge

```html
<div class="wrapper__filters">
  <p class="btn"><span class="itemsleft"></span></p>
  <div class="wrapper__filters-center">
    <input type="radio" id="all" name="filter" value="all" class="btn btn--bold" checked />
    <label class="btn btn--bold all" for="all" tabindex="0">All</label>

    <input type="radio" id="active" name="filter" value="active" class="btn btn--bold" />
    <label class="btn btn--bold active" for="active" tabindex="0">Active</label>

    <input type="radio" id="completed" name="filter" value="completed" class="btn btn--bold" />
    <label class="btn btn--bold completed" for="completed" tabindex="0">Completed</label>
  </div>
  <button class="btn btn--clear">Clear Completed</button>
</div>
```

```css
.container.darkTheme {
  --primary-text-color: var(--Purple300);
  --secondary-text-color: var(--Purple700);
  --primary-bg-color: var(--Navy950);
  --secondry-bg-color: var(--Navy900);
  --bg-image: var(--bg-desktop-dark);
  --border-color: var(--Purple800);
  --checked-text-color: var(--Purple700);
  .Header__themelogo {
    &-light {
      display: none;
    }
    &-dark {
      display: block;
    }
  }
  & .btn:hover {
    color: var(--Purple100);
  }
  & .btn:focus {
    color: var(--Purple100);
  }
}
```

```js
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
```

### AI Collaboration

I used ChatGPT to fiqure out how to handle fillters and drag and drop functions it helped alot to fiqure out the login behind these functions

## Author

- GitHub - [mohamad-aboeisa](https://github.com/mohamad-aboeisa)
- Frontend Mentor - [Mohamad Aboeisa](https://www.frontendmentor.io/profile/mohamad-aboeisa)
- LinkedIn - [Mohamad Osama](www.linkedin.com/in/mohamad-osama-aboeisa)
