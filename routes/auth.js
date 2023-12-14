const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ err: 'Please add username or password.' });
  }
  const token = jwt.sign({ username, password }, process.env.JWT_SECRET);
  return res.status(201).json({ message: 'Auth', token });
});

module.exports = router;
