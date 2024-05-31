// src/pages/Dashboard.js

import { renderTodoList } from '../components/todoList';
import { renderAddTaskModal } from '../components/AddModal';
import { deleteTask, updateTask,getAllTasks,createTask,getTaskById } from '../services/tasks';
import { renderEditModal } from '../components/EditModal';
//import { displayErrorMessage } from '../components/errorMessage';
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
  updateLocalStorage,
} from '../utils/helpers';

export async function renderDashboardPage() {
  // Retrieve the user object from localStorage
  const user = getUserFromLocalStorage();
  console.log('user', user);

  // Ensure the user object is present
  if (!user) {
    console.error('User not found in localStorage');
    return;
  }

  // Extract the userId from the user object
  const userId = user.id;

  // Create a welcome message
  const welcomeMessage = `Welcome, ${user.userName}!`;

  // Insert the welcome message into your dashboard's HTML
  const welcomeElement = document.getElementById('welcome'); // replace 'welcome' with the actual id of your welcome message element
  welcomeElement.textContent = welcomeMessage;

  // Retrieve the todo lists from the user object
  // let todos = user.userTasks || [];
  let todos = user.preferencies || [];

  // Render the todo lists through the renderTodoList function / component
  const todoListContainer = document.getElementById('taskLists'); // replace 'taskLists' with the actual id of your container

  async function handleEdit(todo) {
    try {
      renderEditModal(todo, async (updatedFields) => {
        // Obteniu l'objecte complet
        const fullTodo = await getTaskById(userId, todo.id);
        console.log('Full task data before update:', fullTodo);
  
        // Actualitzeu només els camps necessaris
        const updatedTodo = { ...fullTodo, ...updatedFields };
        console.log('Updated task data:', updatedTodo);
  
        // Actualitzeu la tasca a la base de dades
        await updateTask(userId, todo.id, updatedTodo);
        console.log('Updating task with data:', updatedTodo);
  
        // Obtén de nou la llista de tasques
        const todos = await getAllTasks(userId);
  
        // Actualitza l'emmagatzematge local amb la nova llista de tasques
        saveUserToLocalStorage(userId, todos);
  
        // Renderitza la llista de tasques actualitzada
        render();
      });
    } catch (error) {
      console.error(error);
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
  async function handleAddTask(newTodo) {
    try {
      console.log('Adding task', newTodo);
      // 1st -> We create the task in the database
      await createTask(userId, newTodo);
      // 2nd -> We obtain again the list of todos in the database
      console.log('getting all tasks');
      const todos = await getAllTasks(userId);
      // 3rd -> We update the local storage with the new list of todos
      saveUserToLocalStorage(userId, todos);
      // 4th -> Now yes, we can render the updated list of todos
      render();
    } catch (error) {
      console.error(error);
    }
  }

  // function render() {
  //   todoListContainer.innerHTML = '';
  //   renderTodoList(todos, 'taskLists', handleEdit, handleDelete);
  // }

  async function render() {
    try {
      // 1st -> We obtain the list of todos in the database
      const todos = await getAllTasks(userId);
      // 2nd -> We update the local storage with the new list of todos
      saveUserToLocalStorage(userId, todos);
      // 3rd -> We render the updated list of todos
      todoListContainer.innerHTML = '';
      renderTodoList(todos, 'taskLists', handleEdit, handleDelete);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  

  // function displayUserPreferences(user) {
  //   // Retrieve the preferences from the user object
  //   let preferences = user.preferencies || [];
  
  //   // Get the container where you want to display the preferences
  //   const preferencesContainer = document.getElementById('taskListsContainer'); // replace 'preferences' with the actual id of your container
  
  //   // Clear the container
  //   preferencesContainer.innerHTML = '';
  
  //   // Create and append a new element for each preference
  //   preferences.forEach((preference) => {
  //     const preferenceElement = document.createElement('p');
  //     preferenceElement.textContent = preference;
  //     preferencesContainer.appendChild(preferenceElement);
  //   });
  // }
  
  // // Call the function with the user object
  // displayUserPreferences(user);
  // In this case, the EventListener, as it is single button in the dashboard,
  // we define it here in the DashboardPage.js
  const addTodoButton = document.getElementById('addTodoButton');
  // When the user clicks the button, we render the modal to add a new task and we pass
  // the handleAddTask as a callback function to be called when the user clicks the save button in the modal
  addTodoButton.addEventListener('click', () => {
    renderAddTaskModal(handleAddTask);
  });

  render();
}
renderDashboardPage();
