const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const profilCtrl = require('../controllers/profil');

router.get('/:id', profilCtrl.getOneUser);
router.get('/', profilCtrl.allUser);
router.delete('/:id', profilCtrl.deleteUser);
router.put('/:id', profilCtrl.modifyUser);


module.exports = router;