const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const messageCtrl = require('../controllers/message');

router.get('/', auth, messageCtrl.allMessage);
router.get('/:id', messageCtrl.oneMessage);
router.delete('/:id', messageCtrl.deleteMessage);
router.put ('/:id', messageCtrl.modifyMessage);
router.post('/', multer, messageCtrl.createMessage);
router.get('/user/:id', messageCtrl.getUserMessage);
// router.get('/:id/like', messageCtrl.getLike);
// router.post('/:id/like', messageCtrl.addLike);


module.exports = router;