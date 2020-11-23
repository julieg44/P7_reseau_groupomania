const express = require('express');
const Sequelize = require('sequelize');

const app = express();

const sequelize = new Sequelize ('groupomania', 'julie','marty',{
   host:'localhost',
   dialect: 'mysql'
 });

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;