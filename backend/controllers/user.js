const Models = require('../models/');
const bcrypt = require('bcrypt');


exports.signup = (req, res, next) => {
  console.log(req.body.password)

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          password: hash,
          isAdmin: false,
        });
        console.log(user);
        Models.User.create({ user })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {

};


// let gobinPersonne = req.body ;
// console.log(gobinPersonne);

// const {
//     espece,
//     date_naissance,
//     nom,
//     commentaires
// } = req.body;

//     Models.Individu.create({
//     espece: gobinPersonne.espece,
//     date_naissance: gobinPersonne.date_naissance,
//     nom: gobinPersonne.nom,
//     commentaires: gobinPersonne.commentaires
// })