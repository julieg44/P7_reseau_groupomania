const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

// router.get('/message/:id', likeCtrl.allLike);
// router.delete('/:id', likeCtrl.supLike);
router.post('/message/:id/add', likeCtrl.postLike);
router.post('/message/:id', likeCtrl.createLike);
router.get('/message/:id', likeCtrl.getLike)
// router.put('/:id', likeCtrl.modifyLike);


module.exports = router;