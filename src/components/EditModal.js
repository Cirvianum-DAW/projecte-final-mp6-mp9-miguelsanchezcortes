/* eslint-disable indent */
// This component is based in the modal component from Flowbite --> https://flowbite.com/docs/components/modal/

// Una manera d'evitar haver d'utilitzar massa funcions per anar creant la nostra estructura
// html és utilitzar un template literal, que ens permetrà escriure el nostre html de manera més

// En aquest cas, ja que hem agafat el modal de Flowbite, podem copiar el codi html del modal i
// modifcar només les parts que necessitem.

export async function renderEditModal(todo, onSave) {
  // Create modal elements using template literals
  const modalHtml = `
    <div id="default-modal" class="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto bg-black bg-opacity-50">
      <div class="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700 m-4">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Todo</h3>
          <button type="button" class="text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 ms-auto justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">X</button>
        </div>
        <div class="p-4 md:p-5">
          <form id="edit-todo-form">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
              <input type="text" id="name" value="${
                todo.name
              }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="categoria">Categoria</label>
              <input type="text" id="categoria" value="${
                todo.categoria
              }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="img">Img</label>
              <input type="text" id="img" ${
                todo.image
              } class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex items-center justify-between">
              <button type="button" id="save-changes" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  const closeButton = modalContainer.querySelector('[data-modal-hide]');
  const saveButton = modalContainer.querySelector('#save-changes');
  const titleInput = modalContainer.querySelector('#name');
  const categoriaInput = modalContainer.querySelector('#categoria');
  const imgInput = modalContainer.querySelector('#img');

  closeButton.addEventListener('click', () => {
    modalContainer.remove();
  });

  saveButton.addEventListener('click', () => {
    // We create an updatedTodo object with the input values
    const updatedTodo = {
      ...todo,
      name: titleInput.value,
      categoria: categoriaInput.value,
      image: imgInput.value,
    };

    // Now it's time to call it with the updated todo
    onSave(updatedTodo);
    modalContainer.remove();
  });

  return modalContainer;
}
