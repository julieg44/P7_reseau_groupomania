const Models = require('../models');


exports.allMessage = (req, res, next) => {
    Models.Message.findAll({
        include:[Models.Comment, Models.Like]
    })
      .then(results => {
      res.json(results);
      })
}

exports.oneMessage = (req, res, next) => {
    Models.Message.findOne({ 
        where: { id: req.params.id },
        include:[Models.Comment, Models.Like]
    })
    .then (message => res.status (200).json(message))
    .catch(error => res.status (404).json ({error}))
}

exports.deleteMessage = (req, res, next) => {
    Models.Message.destroy({ where: { id: req.params.id } })
    .then (() => res.status (200).json({ message: 'Message supprimé !'}))
    .catch(error => res.status (404).json ({error}))
}

exports.modifyMessage = (req, res, next) => {
    Models.Message.update({...req.body},{where: { id: req.params.id } })
    .then (function(){
        Models.Message.findOne({ where: { id: req.params.id } })
        .then (message => res.status (200).json({data: message, message: 'message modifié !'}))
        })
      .catch(error => res.status(400).json({ error }));
}

exports.createMessage = (req, res, next) => {
    console.log(req.body)
    Models.Message.create({
        UserId: req.body.UserId,
        title: req.body.title,
        content: req.body.content,
        nbLikes: req.body.nbLikes,
        nbDislikes: req.body.nbDislikes,
        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(Message => res.status(201).json({
        message:'Post créé',
        data: Message,
    }))
}

exports.getUserMessage = (req, res, next) => {
    console.log(req.params.idUser)
    Models.Message.findAll({ where: { UserId: req.params.idUser} })
    .then (message => res.status (200).json(message))
    .catch(error => res.status (404).json ({error}))
}

exports.getLike = (req, res, next) => {
    Models.Message.findOne ({where: { id: req.params.id}})
    .then (message => res.status (200).json(message.likes))
    .catch(error => res.status (404).json ({error}))
}

exports.addLike = (req, res, next) => {
    Models.Message.update({...req.body},{where: { id: req.params.id } })
    .then (function(){
        Models.Message.findOne({ where: { id: req.params.id } })
        .then (message => res.status (200).json({data: message, message: 'message modifié !'}))
        })
      .catch(error => res.status(400).json({ error }));}

