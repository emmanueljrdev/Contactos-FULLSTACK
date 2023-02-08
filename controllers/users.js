const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { PAGE_URL } = require('../config.js')

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  //Buscar si el email ya esta regsitrado
  const user = await User.findOne({ email });

  //Buscar si usuario existe
  if (user) {
    return response.status(400).json({ error: 'email ya se encuentra en uso' });
  }

  // Si el usuario no completa los campos, envía este error
  if (!(name && email && password)) {
    return response.status(400).json({ error: 'todos los campos son requeridos' });
  }

  // Encriptar contraseña
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Crear usuario en la base de datos
  const newUser = new User({
    name,
    email,
    passwordHash,
  });

  // Guardar el modelo/usuario
  const savedUser = await newUser.save();

  // Crear el SMTP para el email de verificación

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.NODE_ENV === 'production'
      ? 465
      : 587,
    secure: process.env.NODE_ENV === 'production'
      ? true
      : false,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // Token de verificación que expira en un minuto

  const userForToken = {
    email,
    id: savedUser.id
  };

  // En donde dice 'expiresIn' se puede cambiar el valor de '1m' a '1d' para que expire en un día
  const verifyToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

  // Email que se enviará al usuario que se registre
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // Dirección email desde dónde se envía
    to: savedUser.email, // Receptor del email
    subject: 'Hola', // Asunto
    text: 'Hola', // Cuerpo del mensaje
    html: `<a href="${PAGE_URL}verify/${savedUser.id}/${verifyToken}">Verificar correo</a>`, // Esqueleto HTML
  });

  return response.status(201).json(savedUser); 
});

userRouter.patch('/:id/:token', async (request, response) => {

  //Buscar el usuario registrado 
  const user = await User.findById(request.params.id);

  //Buscar si usuario no existe
  if (!user) {
    return response.status(400).json({ error: 'El usuario no existe' });
  };

  // Variable del token

  const decodedToken = jwt.verify(request.params.token, process.env.ACCESS_TOKEN_SECRET);

  // Si el token no es válido (expiró), eliminar el usuario creado. (No funciona)
  if (!decodedToken) {
    await User.findByIdAndDelete(request.params.id);
    return response.status(201).json(false);
  };

  // Si el usuario existe y se verificó, cambiará el parametro en la base de datos de 'verified: false' a 'verified: true' y dejará acceder a los contactos.
  await User.findByIdAndUpdate(request.params.id, { verified: true });

  return response.status(201).json(true);
});

module.exports = userRouter;