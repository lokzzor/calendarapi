const express = require('express');
const router = express.Router();
const User =  require('../controller/user');
const authMiddleware = require ('../middleware/auth.middleware');


router.get('/conectionbase', User.ConectionToBase);
router.post('/createuser', User.CreateUser);
router.post('/login', User.Login);
router.get('/updateauth',authMiddleware, User.UpdateAuth);


module.exports = router 
