// src/components/TodoList.js

import { renderTodoItem } from './TodoItem';

export function renderTodoList(todos, ulId, onEdit, onDelete) {
  const todoListElement = document.querySelector(`#${ulId}`);
  todoListElement.innerHTML = ''; // Clear the list before rendering

  todos.forEach((todo) => {
    const todoItemElement = renderTodoItem(todo, onEdit, onDelete);
    todoListElement.appendChild(todoItemElement);
  });

  return todoListElement;
}
