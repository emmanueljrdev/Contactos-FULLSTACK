//Imports
import { showNotification } from '../components/notification.js';


//Selectors
const form = document.querySelector('#form');
const inputEmail = document.querySelector('#email-input');
const inputPassword = document.querySelector('#password-input');
const notification = document.querySelector('#notification');


form.addEventListener('submit', async e => {
  try {
    e.preventDefault();
    const credentials = {
      email: inputEmail.value,
      password: inputPassword.value
    };
    const { data } = await axios.post('/api/login', credentials);
    // cargar id en la barra de navegacion y llevar a otra pagina
    window.location.pathname = `/app/${data}`;

  } catch (error) {
    console.log(error);
    showNotification(error.response.data.error, true, notification);

  }
});
