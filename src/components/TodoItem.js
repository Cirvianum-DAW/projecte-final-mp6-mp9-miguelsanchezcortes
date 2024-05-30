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

  const name = document.createElement('span');
  name.textContent = todo.name;
  name.classList.add('mr-2', 'font-medium');

  const categoria = document.createElement('span');
  categoria.textContent = "Categoria: " + todo.categoria;
  categoria.classList.add('text-gray-500', 'text-sm');

  const image = document.createElement('img');
  image.src = todo.image;
  image.classList.add('mr-2', 'w-25', 'h-20');

  const buttonContainer = document.createElement('div');

  // Add the edit and delete buttons to the button container
  // The callback function will be called when the button is clicked
  const editButton = renderEditButton(() => onEdit(todo));
  const deleteButton = renderDeleteButton(() => onDelete(todo.id));

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  listItem.appendChild(name);
  listItem.appendChild(categoria);
  listItem.appendChild(image);
  listItem.appendChild(buttonContainer);

  return listItem;
}
