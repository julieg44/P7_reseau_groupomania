const Models = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const fs = require('fs');

//   /** Default Options
//     maskWith: "*"
//     maxMaskedCharacters: 16
//   **/
 
//  const password = "Password1$";
 
//  const maskedPassword = MaskData.maskPassword(password)


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        Models.User.create({ 
          email:req.body.email,
          username:req.body.username,
          password: hash,
          isAdmin: false,
          photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         })
        .then(User => res.status(201).json({ 
          message: 'Utilisateur créé !',
          user: User, 
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
            // user: user,
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
  Models.User.findOne({ where: { id: req.params.id } })
  .then (user => res.status (200).json(user))
  .catch(error => res.status (404).json ({error}))
}

exports.deleteUser = (req, res, next) => {
  Models.User.findOne({ where: { id: req.params.id } })
  .then(user => {
    const filename = user.photo.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Models.User.destroy({where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
};

// exports.modifyUser = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//   .then(hash => {
//     if (req.file === undefined){
//       Models.User.update({
//         email:req.body.email,
//         username:req.body.username,
//         password: hash,
//         isAdmin: false,
//       },{ where: { id: req.params.id } , returning: true, plain: true})
//           .then (function(){
//       Models.User.findOne({ where: { id: req.params.id } })
//       .then (user => res.status (200).json({data: user, message: 'ok'}))
//       })
//     .catch(error => res.status(400).json({ error }));
//     } else {
//       Models.User.update({ 
//         email:req.body.email,
//         username:req.body.username,
//         password: hash,
//         isAdmin: false,
//         photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//        },{ where: { id: req.params.id } , returning: true, plain: true})
    
//     .then (function(){
//       Models.User.findOne({ where: { id: req.params.id } })
//       .then (user => res.status (200).json({data: user, message: 'ok'}))
//       })
//     .catch(error => res.status(400).json({ error }));
//       }
//   })
// };

exports.modifyUser = (req, res, next) => {
  // bcrypt.hash(req.body.password, 10)
  // .then(hash => {
    if (req.file === undefined){
      Models.User.update({
        email:req.body.email,
        username:req.body.username,
        // password: hash,
        isAdmin: false,
      },{ where: { id: req.params.id } , returning: true, plain: true})
          .then (function(){
      Models.User.findOne({ where: { id: req.params.id } })
      .then (user => res.status (200).json({data: user, message: 'ok'}))
      })
    .catch(error => res.status(400).json({ error }));
    } else {
      Models.User.findOne({ where: { id: req.params.id } })
      .then(user => {
        const filename = user.photo.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Models.User.update({
            email:req.body.email,
            username:req.body.username,
            // password: hash,
            isAdmin: false,
            photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
           },{ where: { id: req.params.id } , returning: true, plain: true})

           .then (function(){
            Models.User.findOne({ where: { id: req.params.id } })
            .then (user => res.status (200).json({data: user, message: 'ok'}))
            })
          .catch(error => res.status(400).json({ error }));
        });
      })
    }
};


exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then( sauce => { 
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ imageUrl: req.params.imageUrl })
      .then(() => res.status(200).json({ message: 'image supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .then( sauce => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
  };




