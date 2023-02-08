/* eslint-disable no-undef */
const form = document.querySelector('#form');
const inputName = document.querySelector('#name-input');
const inputNumber = document.querySelector('#number-input');
const lista = document.querySelector('#lista');
const NAME_REGEX = /^[a-zA-Z ]{4,25}$/;
const NUMBER_REGEX = /^[4]{1}[1-2]{1}[246]{1}-[0-9]{7}$/;
const notification = document.querySelector('#notification');

let nameValidation = false;
let numberValidation = false;

(async () => {
  try {
    const { data } = await axios.get('/api/todos');

    data.forEach(todo => {
      const elementoLista = document.createElement('li');

      elementoLista.id = todo.id;
      elementoLista.classList.add('flex', 'items-center', 'justify-center', 'h-[7rem]', 'w-[15rem]', 'p-2', 'rounded-md', 'text-white', 'border-2', 'gap-4');
      elementoLista.innerHTML = 
      `<div class="flex flex-col">
      <textarea id="edit-name" class="bg-transparent text-center" readonly cols="1" rows="2">${todo.text}</textarea>
      <input id="edit-number" class="bg-transparent text-center w-[7rem]" readonly type="text" value="${todo.numero}">
      </div>
      <span class="flex flex-col gap-2">
        <button class="border-2 border-red-500 p-1 rounded-md hover:bg-red-500">Borrar</button>
        <button class="bg-blue-500 p-1 rounded-md hover:bg-blue-600">Editar</button>
      </span>`;

      lista.append(elementoLista);

      nameValidation = false;
      numberValidation = false;
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.location.pathname = '/';
    }
  }
})();

const inputValidation = (regexValidation, input) => {
  const information = input.parentElement.parentElement.children[2];
  const wrong = input.parentElement.children[1].children[0];
  const check = input.parentElement.children[1].children[1];


  if (input.value === '') {
    information.classList.add('hidden');
    check.classList.add('hidden');
    wrong.classList.add('hidden');

  } else if (regexValidation) {
    information.classList.add('hidden');
    check.classList.remove('hidden');
    wrong.classList.add('hidden');

  } else if (!regexValidation) {
    information.classList.remove('hidden');
    check.classList.add('hidden');
    wrong.classList.remove('hidden');

  }
  
  
};



form.addEventListener('submit', async e => {
  e.preventDefault();



  if (!nameValidation || !numberValidation) {

    return
  }
  

  const nameValue = inputName.value;
  const numberValue = inputNumber.value;

  const { data } = await axios.post('/api/todos', { text: inputName.value, numero: inputNumber.value});

  const elementoLista = document.createElement('li');
  elementoLista.id = data.id;
  elementoLista.classList.add('flex', 'items-center', 'justify-center', 'h-[7rem]', 'w-[15rem]', 'p-2', 'rounded-md', 'text-white', 'border-2', 'gap-4');
  // elementoLista.id = data.id;

  elementoLista.innerHTML = `
    <div class="flex flex-col">
    <textarea id="edit-name" class="bg-transparent text-center" readonly cols="1" rows="2">${nameValue}</textarea>
    <input id="edit-number" class="bg-transparent text-center w-[7rem]" readonly type="text" value="${numberValue}">
    </div>
    <span class="flex flex-col gap-2">
      <button class="border-2 border-red-500 p-1 rounded-md hover:bg-red-500">Borrar</button>
      <button class="bg-blue-500 p-1 rounded-md hover:bg-blue-600">Editar</button>
    </span>`;



  lista.append(elementoLista);

  inputName.value = '';
  inputNumber.value = '';

  nameValidation = false;
  numberValidation = false;


});

lista.addEventListener('click', async e => {
  const notification = document.querySelector('#notification');
  const editName = document.querySelector('#edit-name');  
  const editNumber = document.querySelector('#edit-number');  
  
  if (e.target.innerText === 'Borrar') {
    const id = e.target.parentElement.parentElement.id;
    await axios.delete(`/api/todos/${id}`);
    e.target.parentElement.parentElement.remove();
    notification.classList.remove('-top-15');
    notification.classList.add('top-20', 'bg-green-500');
    notification.innerText = 'Contacto eliminado con éxito';
    setTimeout(() => {
      notification.classList.add('-top-15');
      notification.classList.remove('top-20', 'bg-green-500');
      
    }, 3000);
  } 
  
  
  
  if (e.target.innerText === 'Editar') { 
    e.target.parentElement.parentElement.children[0].children[0].removeAttribute('readonly');
    e.target.parentElement.parentElement.children[0].children[1].removeAttribute('readonly');
    e.target.innerText = 'Guardar';
    
    
    

  
    nameValidation = true;
    console.log('hola');

    console.log(editName);
  
    editName.addEventListener('input', e => {
      nameValidation = NAME_REGEX.test(e.target.value);
      console.log(nameValidation);
    });
    
    
    } else if (e.target.innerText === 'Guardar') {
      
      console.log('hola');
      if (!nameValidation || editNumber.value.length < 11 || editNumber.value.length > 11) {
        notification.classList.remove('-top-15');
        notification.classList.add('top-20', 'bg-red-500');
        notification.innerText = 'Nombre o número inválidos';
        setTimeout(() => {
          notification.classList.add('-top-15');
          notification.classList.remove('top-20', 'bg-red-500');
          
        }, 3000);
        
      } else {
        notification.classList.remove('-top-15');
        notification.classList.add('top-20', 'bg-green-500');
        notification.innerText = 'Contacto actualizado';
        setTimeout(() => {
          notification.classList.add('-top-15');
          notification.classList.remove('top-20', 'bg-red-500');
          
        }, 3000);
        const id = e.target.parentElement.parentElement.id;

        console.log(editName.value, editNumber.value);
        
        await axios.patch(`/api/todos/${id}`, { text: editName.value, numero: editNumber.value });
        e.target.parentElement.parentElement.children[0].children[0].setAttribute('readonly', '');
        e.target.parentElement.parentElement.children[0].children[1].setAttribute('readonly', '');
        e.target.innerText = 'Editar';
      }
    }
    
  // nameValidation = NAME_REGEX.test(e.target.parentElement.parentElement.children[0].children[0]);
  // numberValidation = NUMBER_REGEX.test(e.target.parentElement.parentElement.children[0].children[1]);
    
    
  }
);



inputName.addEventListener('input', e => {
  nameValidation = NAME_REGEX.test(e.target.value);
  inputValidation(nameValidation, inputName);
});

inputNumber.addEventListener('input', e => {
  numberValidation = NUMBER_REGEX.test(e.target.value);
  console.log(numberValidation);
  inputValidation(numberValidation, inputNumber);
});

