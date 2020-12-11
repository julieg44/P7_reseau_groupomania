const express = require('express');
const Sequelize = require('sequelize');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');


const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const sequelize = new Sequelize ('groupomania_development', 'julie','marty',{
   host:'localhost',
   dialect: 'mysql'
 });

 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes); 
app.use('/api/message', messageRoutes);
app.use ('/api/comment', commentRoutes);
app.use ('/api/like', likeRoutes);




module.exports = app;