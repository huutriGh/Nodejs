const express = require('express');

const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    console.log(req.token);
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {}
});
router.post('/users/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/users', async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  try {
    const user = User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/users/me', auth, async (req, res) => {
  const update = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = update.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const user = req.user;
    update.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
