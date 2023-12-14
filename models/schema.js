const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: false,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
});

const List = mongoose.model('List', schema, 'lists');
module.exports = List;
