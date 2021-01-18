const Models = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config()
const MaskData = require('maskdata');
const fs = require('fs');

const token = process.env.DB_TOKEN

//   /** Default Options
//     maskWith: "*"
//     maxMaskedCharacters: 16
//   **/
 
//  const password = "Password1$";
 
//  const maskedPassword = MaskData.maskPassword(password)


exports.signup = (req, res, next) => {
  if (req.file === undefined) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        Models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            isAdmin: false,
            photo: null
          })
          .then(User => res.status(201).json({
            message: 'Utilisateur créé !',
            user: User,
          }))
          .catch(error => res.json({
            error: true,
            data: [],
            error: "Cet email est déjà utilisé"
          }));
      });
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        Models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            isAdmin: false,
            photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  }

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
              token,
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
  Models.User.findOne({
      where: { id: req.params.id }})
    .then
  if (req.params.photo == !null) {
    (user => {
      const filename = user.photo.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Models.User.destroy({
            where: { id: req.params.id }
          })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
  } else {
    Models.User.destroy({
      where: { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  }
};

exports.supPhotoUser = (req, res, next) => {
  Models.User.update({
    photo : null
  }, { where: { id: req.params.id },returning: true,plain: true })
  .then(function () {
    Models.User.findOne({ where: { id: req.params.id } })
      .then(user => res.status(200).json({
        data: user,
        message: 'photo retirée'
      }))
  })
  .catch(error => res.status(400).json({ error }));
}




  exports.modifyUser = (req, res, next) => {
        // si la photo ne change pas
        if (req.file === undefined) {
          Models.User.update({
              email: req.body.email,
              username: req.body.username,
              isAdmin: false,
            }, { where: { id: req.params.id },returning: true,plain: true })
            .then(function () {
              Models.User.findOne({ where: { id: req.params.id } })
                .then(user => res.status(200).json({
                  data: user,
                  message: 'ok'
                }))
            })
            .catch(error => res.status(400).json({ error }));
        } 
        //// si la photo change
        else {
          Models.User.findOne({ where: { id: req.params.id } })
            .then(user => {
              ///// si la photo existait deja
              if (user.photo !== null) {
                //// on remplace 
                if(req.file !== undefined){
                  const filename = user.photo.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                    Models.User.update({
                        email: req.body.email,
                        username: req.body.username,
                        isAdmin: false,
                        photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                      }, { where: { id: req.params.id }, returning: true, plain: true })
    
                      .then(function () {
                        Models.User.findOne({ where: { id: req.params.id } })
                          .then(user => res.status(200).json({
                            data: user,
                            message: 'photo remplacée'
                          }))
                      })
                      .catch(error => res.status(400).json({ error }));
                  });  
                } 
                //// on supprime
                else {
                  fs.unlink(`images/${filename}`, () => {
                    Models.User.update({
                        email: req.body.email,
                        username: req.body.username,
                        isAdmin: false,
                        photo: null
                      }, { where: { id: req.params.id }, returning: true, plain: true })
    
                      .then(function () {
                        Models.User.findOne({ where: { id: req.params.id } })
                          .then(user => res.status(200).json({
                            data: user,
                            message: 'photo remplacée'
                          }))
                      })
                      .catch(error => res.status(400).json({ error }));
                  });
                }
          
  
                //// s'il n'existait pas de photo
              } 
              else {
                Models.User.update({
                    email: req.body.email,
                    username: req.body.username,
                    isAdmin: false,
                    photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                  }, { where: { id: req.params.id }, returning: true, plain: true })
  
                  .then(function () {
                    Models.User.findOne({ where: { id: req.params.id } })
                      .then(user => res.status(200).json({
                        data: user,
                        message: 'ok'
                      }))
                  })
                  .catch(error => res.status(400).json({ error }));
              }
            })
      } 
    }
    // /////// le MDP change  
    //   else {
    //     bcrypt.hash(req.body.password, 10)
    //       .then(hash => {
    //         //// si la photo ne change pas
    //       if (req.file === undefined) {
    //       Models.User.update({
    //           email: req.body.email,
    //           username: req.body.username,
    //           password:hash,
    //           isAdmin: false,
    //         }, { where: { id: req.params.id },returning: true,plain: true })
    //         .then(function () {
    //           Models.User.findOne({ where: { id: req.params.id } })
    //             .then(user => res.status(200).json({
    //               data: user,
    //               message: 'ok'
    //             }))
    //         })
    //         .catch(error => res.status(400).json({ error }));
    //       } 
    //     //// si la photo change
    //       else {
    //       Models.User.findOne({ where: { id: req.params.id } })
    //         .then(user => {
    //           ///// si la photo existait deja
    //           if (user.photo == !null) {
    //             const filename = user.photo.split('/images/')[1];
    //             fs.unlink(`images/${filename}`, () => {
    //               Models.User.update({
    //                   email: req.body.email,
    //                   username: req.body.username,
    //                   isAdmin: false,
    //                   password:hash,
    //                   photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //                 }, { where: { id: req.params.id }, returning: true, plain: true })
  
    //                 .then(function () {
    //                   Models.User.findOne({ where: { id: req.params.id } })
    //                     .then(user => res.status(200).json({
    //                       data: user,
    //                       message: 'ok'
    //                     }))
    //                 })
    //                 .catch(error => res.status(400).json({ error }));
    //             });
    //           } 
    //           //// s'il n'existait pas de photo
    //           else {
    //             Models.User.update({
    //                 email: req.body.email,
    //                 username: req.body.username,
    //                 isAdmin: false,
    //                 password:hash,
    //                 photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //               }, { where: { id: req.params.id }, returning: true, plain: true })
  
    //               .then(function () {
    //                 Models.User.findOne({ where: { id: req.params.id } })
    //                   .then(user => res.status(200).json({
    //                     data: user,
    //                     message: 'ok'
    //                 }))
    //               })
    //               .catch(error => res.status(400).json({ error }));
    //           }
    //         })
    //       }
    //     })
    //   }
    // }



