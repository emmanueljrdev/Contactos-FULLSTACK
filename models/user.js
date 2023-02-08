const mongoose = require('mongoose');

// Cuerpo que tendrá el objeto en la base de datos.

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  verified: {
    type: Boolean,
    default: false
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;