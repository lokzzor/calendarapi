const express = require('express');
const router = express.Router();
const Calendar =  require('../controller/calendar');


router.get('/calendarselect', Calendar.calendarSelect);
router.get('/scalendarselect', Calendar.sCalendarSelect);



module.exports = router 
