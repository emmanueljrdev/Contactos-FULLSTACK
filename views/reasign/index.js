/* eslint-disable no-undef */
// const jwt = require('jsonwebtoken');

const form = document.querySelector('#form');
const passInput = document.querySelector('#password-input');
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const inputPassword = document.querySelector('#password-input');
const inputConfirm = document.querySelector('#confirm-input');

const checkNXicon = (input, validation) => {
  const xIcon = input.parentElement.children[1].children[0];
  const checkIcon = input.parentElement.children[1].children[1];
  const information = input.parentElement.parentElement.children[2];

  if (input.value === '') {
    checkIcon.classList.add('hidden');
    xIcon.classList.add('hidden');
    information.classList.add('hidden');
  } else if (validation) {
    checkIcon.classList.remove('hidden');
    xIcon.classList.add('hidden');
    information.classList.add('hidden');
  } else if (!validation) {
    xIcon.classList.remove('hidden');
    checkIcon.classList.add('hidden');
    information.classList.remove('hidden');
  }



};


let passwordValidation = false;
let confirmValidation = false;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const token = window.location.pathname.split('/')[2];

  try {
    console.log(passInput.value);
    const { data } = await axios.patch(`/api/reset/${token}`, { password: passInput.value });

    if (!data) {
      window.location.pathname = '/signup';

    } else {
      window.location.pathname = '/login';

    }

  } catch (error) {
    console.log(error);
  }
});


inputPassword.addEventListener('input', e => {
  passwordValidation = PASSWORD_REGEX.test(e.target.value);
  confirmValidation = e.target.value === inputConfirm.value;


  checkNXicon(inputPassword, passwordValidation);
  checkNXicon(inputConfirm, confirmValidation);

});

inputConfirm.addEventListener('input', e => {
  passwordValidation = PASSWORD_REGEX.test(e.target.value);
  confirmValidation = inputPassword.value === e.target.value;

  checkNXicon(inputConfirm, confirmValidation);

});
