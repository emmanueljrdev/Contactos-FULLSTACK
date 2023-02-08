const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  //Buscar si el email ya esta regsitrado
  const user = await User.findOne({ email });

  //Buscar si usuario existe
  if (!user) {
    return response.status(400).json({ error: 'Email y/o contraseña invalidos' });
  }

  // Enviar error si el usuario no está verificado.
  
  if (!user.verified) {
    return response.status(400).json({ error: 'Email no verificado' });
  }

  //verificar el password
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(400).json({ error: 'Email y/o contraseña invalidos' });
  }

  // crear token para el usuario
  const userForToken = {
    email,
    id: user.id
  };

  const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

  response.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });

  // enviar id del usario al frontend
  response.status(200).json(user.id);
});

module.exports = loginRouter;