const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user_app/users');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

const user = new User({
  name: 'Rahul Patil',
  email: 'rahulptl556@gmail.com',
  password: '12345'
});

user.save((err) => {
  if (err) {
    console.error('Error saving user:', err);
  } else {
    console.log('User saved successfully');
  }
});
