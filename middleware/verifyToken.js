// middleware to verify jwt token
const jwt = require('jsonwebtoken');

const verifyJWTToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')?.[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.username = decoded.username;
    next();
  });
};

module.exports = verifyJWTToken;
