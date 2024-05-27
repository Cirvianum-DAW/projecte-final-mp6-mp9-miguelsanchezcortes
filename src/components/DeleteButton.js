// src/components/DeleteButton.js
// src/components/DeleteButton.js

export function renderDeleteButton(onClick) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.classList.add(
    'bg-orange-500',
    'text-white',
    'px-2',
    'py-1',
    'rounded',
    'ml-2'
  );
  button.addEventListener('click', onClick);
  return button;
}
