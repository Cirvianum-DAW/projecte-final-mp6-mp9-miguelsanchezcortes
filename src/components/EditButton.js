// EditButton.js
import { updateTask } from '../services/tasks';

export function renderEditButton() {
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
  editButton.addEventListener('click', () => {
    // Add your logic to edit the task here
    // We imported updateTask from the services/tasks.js file
    const taskId = '123'; // replace with the actual task ID
    const updatedTask = {
      // replace with the updated task properties
    };

    // Update the task in localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update the task in the API
    updateTask(taskId, updatedTask)
      .then((response) => {
        // handle the API response
      })
      .catch((error) => {
        // handle the API error
      });
  });
  return editButton;
}
