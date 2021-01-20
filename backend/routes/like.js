const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

router.post('/message/:id', auth,likeCtrl.createLike);
router.get('/message/:id/like', auth, likeCtrl.getLike)
router.get('/message/:id/dislike', auth, likeCtrl.getDislike)
router.delete('/message/:id/:UserId/like', auth, likeCtrl.supLike)
router.delete('/message/:id/:UserId/dislike', auth, likeCtrl.supDislike)

module.exports = router;