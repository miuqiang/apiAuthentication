const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


// Create a schema
const userSchema = new Schema({
  email: String,
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

// Create a model
const User = mongoose.model('user', userSchema)

// Export the model
module.exports = User;