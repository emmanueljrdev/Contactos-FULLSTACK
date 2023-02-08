const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userExtractor = async (request, response, next) => {
  const authoritation = request.cookies.accessToken;
  if (!authoritation) {
    return response.sendStatus(401);
  }

  const decodedToken = jwt.verify(authoritation, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken.id);
  request.user = user;
  return next();

};

module.exports = userExtractor;