const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const messageCtrl = require('../controllers/message');

router.get('/', auth, messageCtrl.allMessage);
router.get('/tri/:page', auth, messageCtrl.paginerAllMessage);
router.get('/:id', auth, messageCtrl.oneMessage);
router.delete('/:id',auth, multer, messageCtrl.deleteMessage);
router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/user/:id', auth, messageCtrl.getUserMessage);


module.exports = router;