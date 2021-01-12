const Models = require('../models');
const sequelize = require('sequelize');
const { Op } = require("sequelize");



// exports.allLike = (req, res, next) => {
//     Models.Like.findAll({
//         where: { MessageId: req.params.id },
//     })
//       .then(Like => {
//       res.json(Like);
//       })
// };

exports.getLike = (req, res, next) => {
    Models.Like.findAll({
        // where: { MessageId: req.params.id },
        // attributes: {
        //   include: [
        //     [sequelize.fn('COUNT', sequelize.col('like')), 'likecount']
        //   ]
        // },

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
      // where: { MessageId: req.params.id },
      // attributes: {
      //   include: [
      //     [sequelize.fn('COUNT', sequelize.col('like')), 'likecount']
      //   ]
      // },

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


// exports.getLike = (req, res, next) => {
//   Models.Like.findAll({
//       where: { MessageId: req.params.id },
//       include: [Models.User]
//   })
//     .then(response => {
//     res.json(response);
//     })
// };

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


exports.postLike = (req, res, next) => {
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
  }
};

    // Models.Like.create({ 
    //     MessageId:req.body.MessageId,
    //     UserId:req.body.UserId,
    //     like: 1

        
         
    //     // dislike:0,
    //     // userLikes:req.body.userLikes,
    //     // userDislikes:req.body.userDislikes   
    // })



// exports.postLike = (req, res, next) => {
//     const likeClicked = req.body.like
//     const identifiant = req.body.UserId
//     const messId = req.body.MessageId
//     Models.Like.findOne({ where: { MessageId: req.body.MessageId } })
//       .then (like => {

//           if (likeClicked === 1){
      
//               like.userLikes.id.push(identifiant)
//               like.like ++
//               Models.Like.update(
//                 { MessageId:messId,
//                 UserId:req.body.UserId, 
//                 like:like.like, 
//                 // dislike:like.dislike,
//                 // userLikes: like.userLikes 
//                 },
//                 {where: { MessageId: messId } }
//                 )

//               .then (() => res.status(200).json({message:'like OK !', data:like}))
//               .catch(error => res.status(500).json({ 'ICI :':error }));
            
//             // res.status(200).json({message:'like validé !'})
//           }
//            else if (likeClicked === -1){
//             like.dislike ++;
//             like.userDislikes.id.push(identifiant);
  
//             Models.Like.update({ MessageId:messId,
//                 UserId:req.body.UserId, 
//                 like:like.like, 
//                 dislike:like.dislike,
//                 userDislikes: like.userDislikes 
//                 },
//                 {where: { MessageId: messId } })
//                 .then (() => res.status(200).json({message:'dislike OK !', data:like}))
//                 .catch(error => res.status(500).json({ 'ICI':error }));  
//            }
//            else {
  
//             if (like.userLikes.id.includes(identifiant)){
//               like.like --;
//                 like.userLikes.id = like.userLikes.id.filter(function(Id){
//                     return Id !== identifiant
//                 });
  
//             } else if (like.userDislikes.id.includes(identifiant)) {
//               like.dislike --;
//               like.userDislikes.id = like.userDislikes.id.filter(function(Id){
//                 return Id !== identifiant
//                 });
//             }
//             Models.Like.update({ MessageId:messId,
//                 UserId:req.body.UserId, 
//                 like:like.like, 
//                 dislike:like.dislike,
//                 userDislikes: like.userDislikes,
//                 userLikes: like.userLikes 
//                 },
//                 {where: { MessageId: messId } })          
//             .then (() => res.status(200).json({message:'like or dislike remove !', data:like}))
//             .catch(error => res.status(500).json({ 'ICI :':error }));
  
//         //   res.status(200).json({message:"sauce updated"})  
//           }
//     })
//     .catch(error => res.status(500).json({'Oh non': error}));
//   } 