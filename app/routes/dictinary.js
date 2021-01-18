const express = require('express');
const router = express.Router();
const Dictinary =  require('../controller/dictinary');


router.post('/createevent', Dictinary.CreateEvent);
router.post('/createroom', Dictinary.CreateRoom);


module.exports = router