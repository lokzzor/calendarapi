const express = require('express');
const router = express.Router();
const Event =  require('../controller/func-event');


router.get('/calendarnotevent', Event.getCalendarNewEvent);
router.get('/calendarselectroom', Event.getRoomName);
router.get('/room_event', Event.Chart1);
router.get('/room_building', Event.Chart2);
router.get('/calendar_event_new', Event.EventNew);
router.get('/calendar_event_old', Event.EventOld);

module.exports = router 
