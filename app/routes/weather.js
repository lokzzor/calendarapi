const express = require('express');
const router = express.Router();
const Weather =  require('../controller/weather');


router.get('/weather', Weather.Weather);

module.exports = router 
