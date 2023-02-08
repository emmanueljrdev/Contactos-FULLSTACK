const mongoose = require('mongoose');

// Cuerpo que tendrá el objeto en la base de datos.

const todoSchema = new mongoose.Schema({
  text: String,
  numero: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;