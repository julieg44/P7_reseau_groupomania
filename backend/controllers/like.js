const Models = require('../models');


exports.allLike = (req, res, next) => {
    Models.Like.findAll({
        where: { MessageId: req.params.id },
    })
      .then(Like => {
      res.json(Like);
      })
};

exports.supLike = (req, res, next) => {
    Models.Like.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'like supprimé !'}))
      .catch(error => res.status(400).json({message: error}));
};

exports.postLike = (req, res, next) => {
    Models.Like.create({
        UserId: req.body.UserId,
        MessageId:req.body.MessageId,
        likeValue: req.body.likeValue
    })
    .then(Like => res.status(201).json({
        Comment:'like créé',
        data: Like,
    }))
};

exports.modifyLike = (req, res, next) => {
    Models.Like.update({...req.body},{where: { id: req.params.id } })
    .then (function(){
        Models.Like.findOne({ where: { id: req.params.id } })
        .then (like => res.status (200).json({data: like, message: 'like modifié !'}))
        })
      .catch(error => res.status(400).json({ error }));
}