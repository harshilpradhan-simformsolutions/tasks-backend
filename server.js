if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./db/connection');
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/tasks', require('./routes/tasks'));
app.use('/auth', require('./routes/auth'));
app.listen(port, () => console.log('Server Started.'));
