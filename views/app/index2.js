/* eslint-disable no-undef */
const buttonShow = document.querySelector('#show-contact');
const buttonHide = document.querySelector('#hide');
const contactos = document.querySelector('.contacts-container');
const form = document.querySelector('#container-form');
const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const lista = document.querySelector('.contact-list');
const saveBtn = document.querySelector('#save-btn');
const NAME_REGEX = /^[a-zA-Z ]{4,25}$/;
const NUMBER_REGEX = /^[4]{1}[1-2]{1}[246]{1}-[0-9]{7}$/;

let nameValidation = false;
let numberValidation = false;

(async () => {
  try {
    const { data } = await axios.get('/api/todos');

    data.forEach(todo => {
      const elementoLista = document.createElement('li');

      elementoLista.id = todo.id;
      elementoLista.innerHTML = `${todo.text} ${todo.numero} <span></span><svg class= "delete" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;

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

//funcion

const inputValidation = (regexValidation, input, e) => {
  const information = input.parentElement.children[2];
  console.log(regexValidation);

  if (regexValidation) {
    input.classList.add('correct');
    input.classList.remove('incorrect');
    information.classList.remove('show-information');
  } else {
    input.classList.add('incorrect');
    input.classList.remove('correct');
    information.classList.add('show-information');
  } if (input.value === '') {
    information.classList.remove('show-information');
    input.classList.remove('correct');
    input.classList.remove('incorrect');

  }
};

buttonShow.addEventListener('click', e => {
  contactos.classList.toggle('show-contacts');
});

buttonHide.addEventListener('click', e => {
  contactos.classList.remove('show-contacts');
});

lista.addEventListener('click', async e => {
  // console.log(e.target);
  // const boton = e.target.classList.contains('delete')
  // console.log(e.);

  if (e.target.closest('.delete')) {
    if (e.target.classList.contains('delete')) {
      const id = e.target.closest('.delete').parentElement.id;
      await axios.delete(`/api/todos/${id}`);
      e.target.parentElement.remove();
      if (lista.children.length === 0) {
        lista.innerHTML = 'No hay contactos guardados';
      }
    } else {
      const id = e.target.parentElement.parentElement.id;
      await axios.delete(`/api/todos/${id}`);
      e.target.parentElement.parentElement.remove();
      if (lista.children.length === 0) {
        lista.innerHTML = 'No hay contactos guardados';
      }
    }
  }

  localStorage.setItem('lista', lista.innerHTML);

});

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (lista.children.length === 0) {
    lista.innerHTML = '';
  }
  if (!nameValidation || !numberValidation) {
    inputValidation(nameValidation, inputName, e);
    inputValidation(numberValidation, inputNumber, e);
    return;
  }

  const { data } = await axios.post('/api/todos', { text: inputName.value, numero: inputNumber.value });

  // if (!numberValidation) {
  //     inputValidation(numberValidation, inputNumber, e)
  //     return
  // }



  const nameInput = inputName.value;
  const numberInput = inputNumber.value;
  console.log(numberInput);
  const elementoLista = document.createElement('li');
  elementoLista.id = data.id;
  elementoLista.innerHTML = `${nameInput} ${numberInput} <span></span><svg class= "delete" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;



  lista.append(elementoLista);

  inputName.value = '';
  inputNumber.value = '';

  nameValidation = false;
  numberValidation = false;

  // localStorage.setItem('lista', lista.innerHTML)

  // elementoLista.children[0].addEventListener('click', e => {
  //     e.currentTarget.parentElement.remove();

  // })



});

inputName.addEventListener('input', e => {
  nameValidation = NAME_REGEX.test(e.target.value);
});

inputNumber.addEventListener('input', e => {
  numberValidation = NUMBER_REGEX.test(e.target.value);
});

// lista.innerHTML = localStorage.getItem('lista')

if (lista.children.length === 0) {
  lista.innerHTML = 'No hay contactos guardados';
}