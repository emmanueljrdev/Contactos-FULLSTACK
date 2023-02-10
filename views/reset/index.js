const form = document.querySelector('#form');
const responseDiv = document.querySelector('#res-div');

console.log('hola');

const emailInput = document.querySelector('#email-input');

form.addEventListener('submit', async e => {
  e.preventDefault();

  try {
    await axios.post('/api/reset', { email: emailInput.value });
    responseDiv.classList.remove('hidden');
    form.classList.add('hidden');

    setTimeout(() => {
      window.location.pathname = '/reset-password';
    }, 2000);

  } catch (error) {
    console.log(error);
  }
});