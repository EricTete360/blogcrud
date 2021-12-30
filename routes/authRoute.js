const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const verifyToken = require('../middleware/verifyJWT');


router.post('/login',user.login);
router.post('/register',user.register);
router.get('/info',verifyToken,user.getInfo);

module.exports = router;