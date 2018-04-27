const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  email: String,
  password: {
    type: String,
    required: true
  }
})

// Create a model
const User = mongoose.model('user', userSchema)

// Export the model
module.exports = User;