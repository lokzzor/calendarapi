const express = require('express');
const router = express.Router();
const User =  require('../controller/user');
const authMiddleware = require ('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');


router.get('/conectionbase', User.ConectionToBase);
router.get('/firststart', User.FirstStart);
router.post('/updatepassword',User.UpdatePassword);
router.post('/createuser',
    [
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty()
    ], User.CreateUser);
router.post('/login',
    [
        check('login','Email is required'),
        check('password','Password is required').not().isEmpty()
    ], User.Login);
router.get('/updateauth',authMiddleware, User.UpdateAuth);


module.exports = router 
