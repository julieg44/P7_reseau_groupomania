const express = require('express');
const Sequelize = require('sequelize');
const userRoutes = require('./routes/user');
const profilRoutes = require('./routes/profil')
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
app.use('/api/profil', profilRoutes); 



module.exports = app;