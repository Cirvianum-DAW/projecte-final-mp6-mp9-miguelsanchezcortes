// src/components/AddTaskModal.js

export async function renderAddTaskModal(onSave) {
  // Create modal elements using template literals
  const modalHtml = `
    <div id="add-task-modal" class="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto bg-black bg-opacity-50">
      <div class="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700 m-4">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add New Task</h3>
          <button type="button" class="text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 ms-auto justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-task-modal">X</button>
        </div>
        <div class="p-4 md:p-5">
          <form id="add-task-form">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
              <input type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="categoria">Categoria</label>
              <input type="text" id="categoria" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="img">Img</label>
              <input type="text" id="img" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex items-center justify-between">
              <button type="button" id="save-task" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // It's important to note that this modal is exactly the same as the one in
  // the EditModal.js file The only difference is that when we edit we pass the
  // todo object to the modal We could easily improve this by creating a single
  // modal and passing the todo object as an argument!!! CAT --> Ens podríem
  // haver estalviat aquesta duplicació de codi si haguéssim creat un únic modal
  // i li haguéssim passat l'objecte todo com a argument!!!

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  const closeButton = modalContainer.querySelector('[data-modal-hide]');
  const saveButton = modalContainer.querySelector('#save-task');
  const titleInput = modalContainer.querySelector('#name');
  const categoriaInput = modalContainer.querySelector('#categoria');
  const imgInput = modalContainer.querySelector('#img');

  closeButton.addEventListener('click', () => {
    modalContainer.remove();
  });

  saveButton.addEventListener('click', async () => {
    const newTodo = {
      name: titleInput.value,
      categoria: categoriaInput.value,
      image: imgInput.value,
    };

    onSave(newTodo);
    modalContainer.remove();
  });
  return modalContainer;
}
