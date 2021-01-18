const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const DBtoken = process.env.DB_TOKEN
    const decodedToken = jwt.verify(token, DBtoken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};