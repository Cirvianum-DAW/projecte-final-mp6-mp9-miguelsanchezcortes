// src/components/TodoItem.js

import { renderEditButton } from './EditButton';
import { renderDeleteButton } from './DeleteButton';

export function renderTodoItem(todo, onEdit, onDelete) {
  const listItem = document.createElement('li');
  listItem.classList.add(
    'flex',
    'items-center',
    'justify-between',
    'p-2',
    'border',
    'border-gray-300',
    'rounded',
    'mb-2'
  );

  const title = document.createElement('span');
  title.textContent = todo.title;
  title.classList.add('mr-2', 'font-medium');

  const status = document.createElement('span');
  status.textContent = todo.status ? 'Completed' : 'Pending';
  status.classList.add(
    'px-2',
    'py-1',
    'text-white',
    'text-sm',
    'rounded',
    todo.status ? 'bg-green-500' : 'bg-red-500'
  );

  const dueDate = document.createElement('span');
  const date = new Date(todo.dueDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  dueDate.textContent = date.toLocaleDateString(undefined, options);
  dueDate.classList.add('text-gray-500', 'text-sm');

  const buttonContainer = document.createElement('div');

  // Add the edit and delete buttons to the button container
  // The callback function will be called when the button is clicked
  const editButton = renderEditButton(() => onEdit(todo));
  const deleteButton = renderDeleteButton(() => onDelete(todo.id));

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  listItem.appendChild(title);
  listItem.appendChild(status);
  listItem.appendChild(dueDate);
  listItem.appendChild(buttonContainer);

  return listItem;
}
