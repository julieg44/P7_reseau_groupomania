const Models = require('../models');


exports.allComment = (req, res, next) => {
    Models.Comment.findAll({
        where: { MessageId: req.params.id },
    })
      .then(Comment => {
      res.json(Comment);
      })
};

exports.supComment = (req, res, next) => {
    Models.Comment.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
      .catch(error => res.status(400).json({message: error}));
};

exports.postComment = (req, res, next) => {
    Models.Comment.create({
        UserId: req.body.UserId,
        MessageId:req.body.MessageId,
        content: req.body.content,
    })
    .then(Comment => res.status(201).json({
        Comment:'Commentaire créé',
        data: Comment,
    }))
};

exports.modifyComment = (req, res, next) => {
    Models.Comment.update({...req.body},{where: { id: req.params.id } })
    .then (function(){
        Models.Comment.findOne({ where: { id: req.params.id } })
        .then (comment => res.status (200).json({data: comment, message: 'commentaire modifié !'}))
        })
      .catch(error => res.status(400).json({ error }));
}