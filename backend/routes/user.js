const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.allUser);
router.delete('/:id', userCtrl.deleteUser);
router.put('/:id', userCtrl.modifyUser);

module.exports = router;