const todosRouter = require('express').Router();
const todo = require('../models/todo');


// rutas protegidaas para saber si existe y tiene acceso
todosRouter.post('/', async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.sendStatus(401);
  }


  // Extraer del frontend el nombre y el número guardado del contacto.
  const { text, numero } = request.body;

  console.log(text);

  // Si el nombre y el numero no son válidos o no existen, envía este error a la consola.
  if (!text && !numero) {
    return response.sendStatus(400).json({ error: 'El texto es requerido' });
  }

  // Buscar en la base de datos el nombre y el número para que un mismo usuario no duplique contactos (no funciona).

  // const name = await todo.findOne({ text });
  // const number = await todo.findOne({ numero });



  // //Buscar si el nombre existe
  // if (name) {
  //   return response.status(400).json({ error: 'El nombre ya se encuentra en uso' });
  // }
  // // Buscar si el número existe
  // if (number) {
  //   return response.status(400).json({ error: 'El número ya se encuentra en uso' });
  // }


  // Enviar los datos a la base de datos.

  const newTodo = new todo({
    text,
    numero,
    user: user._id
  });

  console.log(newTodo);

  // Guardar los datos enviados en la base de datos.
  const savedTodo = await newTodo.save();

  user.todos = user.todos.concat(savedTodo._id);

  console.log(savedTodo);

  return response.status(201).json(savedTodo);
});

// extraer los contactos de la base de datos del usuario
todosRouter.get('/', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.sendStatus(401);
  }


  const todos = await todo.find({ user: user.id });



  // enviar los contactos al frontend
  return response.status(200).json(todos);


});

// eliminar los contactos en la base de dato y en el frontend
todosRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.sendStatus(401);
  }

  await todo.findByIdAndDelete(request.params.id);
  return response.sendStatus(204);
});

// Actualizar en la base de datos. IMPORTANTE, esto es para poder editar el contacto y enviar los datos cambiados a la base de datos.

todosRouter.patch('/:id', async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.sendStatus(401);
  }
  const { text, numero } = request.body;


  await todo.findByIdAndUpdate(request.params.id, { text, numero });

  return response.sendStatus(200);
});

module.exports = todosRouter;