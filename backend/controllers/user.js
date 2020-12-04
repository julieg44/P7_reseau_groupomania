const Models = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
  console.log(req)
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
          username: User.username, 
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
            userId: user.id,
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


exports.allUser = (req, res, next) => {
  Models.User.findAll()
    .then(results => {
    res.json(results);
    })
}

exports.getOneUser = (req, res, next) => {
  console.log(req.params.id)
  Models.User.findOne({ where: { id: req.params.id } })
  .then (user => res.status (200).json(user))
  .catch(error => res.status (404).json ({error}))
}

exports.deleteUser = (req, res, next) => {
  Models.User.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Profil supprimé !'}))
      .catch(error => res.status(400).json({message: error}));
};

exports.modifyUser = (req, res, next) => {
  console.log(req.body.username)
  Models.User.update({ ...req.body },{ where: { id: req.params.id } , returning: true, plain: true})
    .then (function(){
      Models.User.findOne({ where: { id: req.params.id } })
      .then (user => res.status (200).json({data: user, message: 'ok'}))
      })
    .catch(error => res.status(400).json({ error }));
};




