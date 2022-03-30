const express = require('express');
require('./db/mongoose');

const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const multer = require('multer');
const app = express();

const port = process.env.port || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
});
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
