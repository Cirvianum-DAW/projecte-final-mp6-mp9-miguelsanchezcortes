// Helper functions

// Update local storage with new user todos or tasks
export function updateLocalStorage(userId, todos) {
  console.log('Updating local storage', userId, todos);
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.id === userId) {
    user.userTasks = todos;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
