const Models = require('../models');


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
        where: { MessageId: req.params.id },
        include: [Models.User]
    })
      .then(response => {
      res.json(response);
      })
};



exports.createLike = (req, res, next) => {
    Models.Like.create({ 
        MessageId:req.body.MessageId,
        UserId:req.body.UserId,
        like:req.body.like, 
        dislike:req.body.dislike,
        userLikes:req.body.userLikes,
        userDislikes:req.body.userDislikes   
    })
    .then(Like => res.status(201).json({
        Comment:'like crée',
        data: Like,
    }))
};


exports.postLike = (req, res, next) => {
    const likeClicked = req.body.like
    const identifiant = req.body.UserId
    const messId = req.body.MessageId
    Models.Like.findOne({ where: { MessageId: req.body.MessageId } })
      .then (like => {

          if (likeClicked === 1){
      
              like.userLikes.id.push(identifiant)
              like.like ++
              Models.Like.update(
                { MessageId:messId,
                UserId:req.body.UserId, 
                like:like.like, 
                dislike:like.dislike,
                userLikes: like.userLikes 
                },
                {where: { MessageId: messId } }
                )

              .then (() => res.status(200).json({message:'like OK !', data:like}))
              .catch(error => res.status(500).json({ 'ICI :':error }));
            
            // res.status(200).json({message:'like validé !'})
          }
           else if (likeClicked === -1){
            like.dislike ++;
            like.userDislikes.id.push(identifiant);
  
            Models.Like.update({ MessageId:messId,
                UserId:req.body.UserId, 
                like:like.like, 
                dislike:like.dislike,
                userDislikes: like.userDislikes 
                },
                {where: { MessageId: messId } })
                .then (() => res.status(200).json({message:'dislike OK !', data:like}))
                .catch(error => res.status(500).json({ 'ICI':error }));  
           }
           else {
  
            if (like.userLikes.id.includes(identifiant)){
              like.like --;
                like.userLikes.id = like.userLikes.id.filter(function(Id){
                    return Id !== identifiant
                });
  
            } else if (like.userDislikes.id.includes(identifiant)) {
              like.dislike --;
              like.userDislikes.id = like.userDislikes.id.filter(function(Id){
                return Id !== identifiant
                });
            }
            Models.Like.update({ MessageId:messId,
                UserId:req.body.UserId, 
                like:like.like, 
                dislike:like.dislike,
                userDislikes: like.userDislikes,
                userLikes: like.userLikes 
                },
                {where: { MessageId: messId } })          
            .then (() => res.status(200).json({message:'like or dislike remove !', data:like}))
            .catch(error => res.status(500).json({ 'ICI :':error }));
  
        //   res.status(200).json({message:"sauce updated"})  
          }
    })
    .catch(error => res.status(500).json({'Oh non': error}));
  } 