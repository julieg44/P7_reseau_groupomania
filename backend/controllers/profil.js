const Models = require('../models');



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

