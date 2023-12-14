const express = require('express');
const router = express.Router();
const list = require('../models/schema');
const verifyJWTToken = require('../middleware/verifyToken');

router.use(verifyJWTToken);
router.post('/add', async (req, res) => {
  const { task, isComplete, created_at } = req.body;
  if (!task) {
    return res.status(422).json({ err: 'Please add a task.' });
  }
  const item = new list({
    task,
    isComplete,
    created_at,
    user: req.username,
  });
  try {
    await item.save();
    return res
      .status(201)
      .json({ message: 'Task Added Successfully', todo: { item } });
  } catch (err) {
    console.log(err);
  }
});

router.get('/all', async (req, res) => {
  try {
    const result = await list.find();
    return res.json({
      result: result.filter((e) => e.user === req.username),
    });
  } catch (err) {
    console.log(err);
  }
});

router.put('/update/:id', async (req, res) => {
  const id = {
    _id: req.params.id,
  };
  try {
    const result = await list.findOne({ _id: id });
    if (result.user !== req.username) {
      return res.status(401).json({ message: 'Not Authorized.' });
    }
    await list.updateOne({ _id: id }, { $set: req.body });
    return res.status(201).json({ message: 'Task updated successfully!' });
  } catch (err) {
    return { error: 'Cannot update Task.' };
  }
});

router.delete('/delete/:id', async (req, res) => {
  const id = {
    _id: req.params.id,
  };
  try {
    const result = await list.findOne({ _id: id });
    if (result.user !== req.username) {
      return res.status(401).json({ message: 'Not Authorized.' });
    }
    await list.deleteOne({ _id: id });
    return res.status(201).json({ message: 'Task deleted successfully!' });
  } catch (err) {
    return { error: 'Cannot delete Task.' };
  }
});

module.exports = router;
