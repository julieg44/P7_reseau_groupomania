const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/message/:id', auth, commentCtrl.allComment);
router.delete('/:id', auth,commentCtrl.supComment);
router.post('/message/:id', auth,commentCtrl.postComment);


module.exports = router;