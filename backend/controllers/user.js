const Models = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        Models.User.create({ 
          email:req.body.email,
          username:req.body.username,
          password: hash,
          isAdmin: false
         })
        .then(User => res.status(201).json({ 
          message: 'Utilisateur créé !',
          data: User, 
        }))
        .catch(error => res.json({
          error: true,
          data: [],
          error: error
        }));
    });        
};


exports.login = (req, res, next) => {
  Models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            user: user,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '8h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


