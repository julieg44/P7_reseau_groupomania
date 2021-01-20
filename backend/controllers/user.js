const Models = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { Op } = require("sequelize");

const token = process.env.DB_TOKEN


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


exports.paginerAllUser = (req, res, next) => {
  let limit = 3;   // number of records per page
  let offset = 0;
  Models.User.findAndCountAll()
  .then((data) => {
    let page = req.params.page;      // page number
    let pages = Math.ceil(data.count / limit);
		offset = limit * (page - 1);
    Models.User.findAll({
      limit: limit,
      offset: offset,
      order: [['username', 'ASC']],
    })
    .then((users) => {
      res.status(200).json({'result': users, 'count': data.count, 'pages': pages});
    });
  })
  .catch(function (error) {
		res.status(500).send('Internal Server Error');
	});
}


exports.getOneUser = (req, res, next) => {
  Models.User.findOne({ where: { id: req.params.id } })
  .then (user => res.status (200).json(user))
  .catch(error => res.status (404).json ({error}))
}

exports.getOneUserFiltre = (req, res, next) => {
  Models.User.findOne({ 
    where: { 
       username: 
       { [Op.startsWith]:req.params.username }      
    }
    })
  .then (user => res.status (200).json(user))
  .catch(error => res.status (404).json ({error}))
}



exports.deleteUser = (req, res, next) => {
  Models.User.findOne({
      where: { id: req.params.id }})
    .then (user => {
  if (req.params.photo !== null) {
    
      const filename = user.photo.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Models.User.destroy({
            where: { id: req.params.id }
          })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    
  } else {
    Models.User.destroy({
      where: { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  }
})
};

exports.supPhotoUser = (req, res, next) => {
  Models.User.findOne({ where: { id: req.params.id } })
  .then(user => {
    const filename = user.photo.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Models.User.update({
          photo: null
        }, { where: { id: req.params.id }, returning: true, plain: true })
    
        .then(function () {
          Models.User.findOne({ where: { id: req.params.id } })
            .then(user => res.status(200).json({
              data: user,
              message: 'photo supprimée'
            }))
        })
        .catch(error => res.status(400).json({ error }));
    });
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
                //// on veut la remplacer 
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
                //// on veut la supprimer
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
                            message: 'photo supprimée'
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