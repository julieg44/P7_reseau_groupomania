const Models = require('../models');
const sequelize = require('sequelize');
const { Op } = require("sequelize");




exports.getLike = (req, res, next) => {
    Models.Like.findAll({
        where: {
          [Op.and]: [
            { MessageId: req.params.id },
            { like: {[Op.gt]: 0,}}
          ],
        },
        include: [Models.User]
    })
      .then(response => {
      res.json(response);
      })
};


exports.getDislike = (req, res, next) => {
  Models.Like.findAll({
      where: {
        [Op.and]: [
          { MessageId: req.params.id },
          { dislike: {[Op.gt]: 0,}}
        ],
      },
      include: [Models.User]
  })
    .then(response => {
    res.json(response);
    })
};


exports.supLike = (req, res, next) =>{
  Models.Like.destroy({
    where: { UserId: req.params.UserId } && { MessageId: req.params.id } && { like: 1 }
  })
  .then(Like => res.status(201).json({
    Comment:'like supprimé',
    data: Like,
  }))
} 

exports.supDislike = (req, res, next) =>{
  Models.Like.destroy({
    where: { UserId: req.params.UserId } && { MessageId: req.params.id } && { dislike: 1 }
  })
  .then(Like => res.status(201).json({
    Comment:'dislike supprimé',
    data: Like,
  }))
} 



exports.createLike = (req, res, next) => {
  if (req.body.like === 1){
    Models.Like.create({ 
      MessageId:req.body.MessageId,
      UserId:req.body.UserId,
      like: 1
    })
    .then(Like => res.status(201).json({
      Comment:'like crée',
      data: Like,
    }))
  }
  else if (req.body.like === -1){
    Models.Like.create({ 
      MessageId:req.body.MessageId,
      UserId:req.body.UserId,
      dislike: 1
    })
    .then(Like => res.status(201).json({
      Comment:'like crée',
      data: Like,
    }))
  } else {
    Models.Like.create({ 
      MessageId:req.body.MessageId,
      UserId:req.body.UserId,
    })
    .then(Like => res.status(201).json({
      Comment:'like crée',
      data: Like,
    }))
  }
};


