// src/services/tasks.js

import fetchFromApi from './fetchAPI';

// GET ALL TASKS
async function getAllTasks(userId) {
  return fetchFromApi(`users/${userId}/Preferencies`);
}

// GET A SINGLE TASK BY ID
async function getTaskById(userId, taskId) {
  return fetchFromApi(`users/${userId}/Preferencies/${taskId}`);
}

// CREATE A NEW TASK
async function createTask(userId, task) {
  return fetchFromApi(`users/${userId}/Preferencies`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// UPDATE A TASK
async function updateTask(userId, taskId, task) {
  return fetchFromApi(`users/${userId}/Preferencies/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// DELETE A TASK
async function deleteTask(userId, taskId) {
  console.log('userId', userId);
  console.log('taskId', taskId);
  return fetchFromApi(`users/${userId}/Preferencies/${taskId}`, {
    method: 'DELETE',
  });
}

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
