const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('You are not authorized to do this');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token');
  }
}
module.exports = auth

