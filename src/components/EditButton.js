// EditButton.js

export function renderEditButton(onClick) {
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add(
    'px-2',
    'py-1',
    'mr-2',
    'bg-indigo-500',
    'text-white',
    'rounded'
  );

  editButton.addEventListener('click', onClick);
  return editButton;
}
