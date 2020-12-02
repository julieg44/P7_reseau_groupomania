const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const messageCtrl = require('../controllers/message');

router.get('/', messageCtrl.allMessage);
router.get('/:id', messageCtrl.oneMessage);
router.delete('/:id', messageCtrl.deleteMessage);
router.put ('/:id', messageCtrl.modifyMessage);
router.post('/', messageCtrl.createMessage);
router.get('/user/:id', messageCtrl.getUserMessage);
// router.get('/:id/like', messageCtrl.getLike);
// router.post('/:id/like', messageCtrl.addLike);


module.exports = router;