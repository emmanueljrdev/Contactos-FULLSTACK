const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const table = document.querySelector("table");
const nameRegex = /^[a-zA-Z]+$/;
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

(async() =>{
  try {
		const { data } = await axios.get('/api/todos');
    data.forEach(todo => {
      const newRow = document.createElement("tr");
      newRow.id = todo.id;
      newRow.innerHTML = `<input readonly type="text" value="${todo.text}"><input readonly type="text" value="${todo.number}"><td><button class="delete-button">Delete</button></td> <td><button class="edit-button">Edit</button></td>`;
      table.appendChild(newRow);
      
    });
    
  } catch (error) {
    if (error.response.status === 401){
      window.location.pathname = '/';
		}
  }
})();



form.addEventListener("submit", async e => {
  e.preventDefault();
  
  const name = nameInput.value;
  const phone = phoneInput.value;

  if (!nameRegex.test(name)) {
    alert("Name is not valid. Please enter only letters.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Phone is not valid. Please enter the format 123-456-7890.");
    return;
  }

const { data } = await axios.post('/api/todos', { text: nameInput.value, number: phoneInput.value });

  const newRow = document.createElement("tr");
  newRow.id = data.id
  newRow.innerHTML = `<input readonly type="text" value="${name}"><input readonly type="text" value="${phone}"><td><button class="delete-button">Delete</button></td> <td><button class="edit-button">Edit</button></td>`;
  table.appendChild(newRow);

  form.reset();
});

document.querySelector("table").addEventListener("click", async e => {
  if (e.target.className === "delete-button") {
    const id = e.target.parentElement.parentElement.id
    await axios.delete(`/api/todos/${id}`)
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.innerText === 'Edit') {
    const name = e.target.parentElement.parentElement.children[0];
    const number = e.target.parentElement.parentElement.children[1];
    name.removeAttribute('readonly');
    number.removeAttribute('readonly');
    e.target.innerText = 'Save'
  }else if (e.target.innerText === 'Save') {
    const td = e.target.parentElement.parentElement;
    console.log(td);
    const name = e.target.parentElement.parentElement.children[0];
    const number = e.target.parentElement.parentElement.children[1];
    console.log(name, number);
    await axios.patch(`/api/todos/${td.id}`, { text: name.value, number: number.value });
    name.setAttribute('readonly', 'readonly');
    number.setAttribute('readonly', 'readonly');
    e.target.innerText = 'Edit'
    
  }
});