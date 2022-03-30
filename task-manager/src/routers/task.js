const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/tasks', auth, async (req, res) => {
  try {
    //const tasks = await Task.find({ owner: req.user._id });
    const match = {};
    const sort = {};

    if (req.query.complete) {
      match.complete = req.query.complete === 'true';
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(404).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const update = Object.keys(req.body);
  const allowedUpdates = ['description', 'complete'];
  const isValidOperation = update.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(404).send({ error: 'Invalid updates!' });
  }
  try {
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send(task);
    }

    update.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(401).send;
    }
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
