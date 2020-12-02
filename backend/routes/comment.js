const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/message/:id', commentCtrl.allComment);
router.delete('/:id', commentCtrl.supComment);
router.post('/message/:id', commentCtrl.postComment);
router.put('/:id', commentCtrl.modifyComment);


module.exports = router;