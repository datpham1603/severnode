const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true
  }
});

const Users = mongoose.model('User', userSchema);
module.exports = Users; 

