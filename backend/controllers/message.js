const Models = require('../models');
const sequelize = require('sequelize');
const fs = require('fs');


exports.allMessage = (req, res, next) => {
    Models.Message.findAll({
        include:[Models.Comment, Models.Like, Models.User],
        order:[
            ['id', 'DESC']
        ]
    })
      .then(results => {
      res.json(results);
      })
}

exports.paginerAllMessage = (req, res, next) => {
    let limit = 3;   // numbre de message par page
    let offset = 0;
    Models.Message.findAndCountAll()
    .then((data) => {
      let page = req.params.page;      // nombre de la page
      let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
      Models.Message.findAll({
        include:[Models.Comment, Models.Like, Models.User],
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']]  
      })
      .then((messages) => {
        res.status(200).json({'result': messages, 'count': data.count, 'pages': pages});
      });
    })
    .catch(function (error) {
          res.status(500).send('Internal Server Error');
    });
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
    Models.Message.findOne({ where: { id: req.params.id } })
    .then (message => {
    if (message.attachment !== null) {
          const filename = message.attachment.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Models.Message.destroy({
                where: { id: req.params.id }
              })
              .then(() => res.status(200).json({ message: 'Message supprimé !'}))
              .catch(error => res.status(400).json({ error }));
          });    
      } else {
        Models.Message.destroy({
          where: { id: req.params.id }
        })
        .then(() => res.status(200).json({ message: 'Message supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      }
    })
}


exports.createMessage = (req, res, next) => {
    if(req.file === undefined){
        Models.Message.create({
            UserId: req.body.UserId,
            title: req.body.title,
            content: req.body.content,
        })
        .then(Message => res.status(201).json({
            message:'Post créé',
            data: Message,
        }))
    } else {
        Models.Message.create({
            UserId: req.body.UserId,
            title: req.body.title,
            content: req.body.content,
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(Message => res.status(201).json({
            message:'Post créé',
            data: Message
        }))
    }

}

exports.getUserMessage = (req, res, next) => {
    Models.Message.findAll({ 
        where: { UserId: req.params.id} ,
        include:[Models.Comment, Models.Like, Models.User],
        order:[
            ['createdAt', 'DESC']
        ]
    })
    .then (message => res.status (200).json(message))
    .catch(error => res.status (404).json ({error}))
}



