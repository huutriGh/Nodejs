const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Email is invalid');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age must be a positive number');
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Ensure that passoword doesn\'t conatain "password"');
//       }
//       if (value.length <= 6) {
//         throw new Error(`Ensure that passoword's length is greater than 6`);
//       }
//     },
//   },
// });

// const me = new User({
//   name: ' Mike  ',
//   email: 'mike@MEAD.IO     ',
//   password: 'yifuy',
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   complete: {
//     type: Boolean,
//     default: 0,
//   },
// });

// const newTask = new Task({
//   //   description: 'Learn mongoose library',
//   //   complete: false,
// });

// newTask
//   .save()
//   .then(() => {
//     console.log(newTask);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
