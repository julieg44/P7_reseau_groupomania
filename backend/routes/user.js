const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', auth, userCtrl.getOneUser);
router.get('/recherche/:username', auth, userCtrl.getOneUserFiltre);
router.get('/', auth, userCtrl.allUser);
router.get('/tri/:page', auth, userCtrl.paginerAllUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.put('/:id/photo', auth, userCtrl.supPhotoUser )

module.exports = router;