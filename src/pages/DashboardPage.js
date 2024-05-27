// src/pages/Dashboard.js

import { renderTodoList } from '../components/TodoList';
import { deleteTask } from '../services/tasks';
//import { displayErrorMessage } from '../components/errorMessage';
import { updateLocalStorage } from '../utils/helpers';

export async function renderDashboardPage() {
  // Retrieve the user object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Ensure the user object is present
  if (!user) {
    console.error('User not found in localStorage');
    return;
  }

  // Extract the userId from the user object
  const userId = user.id;

  // Create a welcome message
  const welcomeMessage = `Welcome, ${user.firstName}!`;

  // Insert the welcome message into your dashboard's HTML
  const welcomeElement = document.getElementById('welcome'); // replace 'welcome' with the actual id of your welcome message element
  welcomeElement.textContent = welcomeMessage;

  // Retrieve the todo lists from the user object
  let todos = user.userTasks || [];

  // Render the todo lists through the renderTodoList function / component
  const todoListContainer = document.getElementById('taskLists'); // replace 'taskLists' with the actual id of your container

  function handleEdit(todo) {
    const newText = prompt('Edit todo', todo.title);
    if (newText) {
      todo.title = newText;
      updateLocalStorage(userId, todos);
      render();
    }
  }

  async function handleDelete(todoId) {
    try {
      console.log('Deleting task', todoId);
      await deleteTask(userId, todoId);
      todos = todos.filter((todo) => todo.id !== todoId);
      updateLocalStorage(userId, todos);
      render();
    } catch (error) {
      console.error(error);
    }
  }

  function render() {
    todoListContainer.innerHTML = '';
    renderTodoList(todos, 'taskLists', handleEdit, handleDelete);
  }

  render();
}
