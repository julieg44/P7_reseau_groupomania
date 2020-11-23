const express = require('express');
const Sequelize = require('sequelize');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();

const sequelize = new Sequelize ('groupomania', 'julie','marty',{
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

app.use('/api/auth', userRoutes); 



module.exports = app;