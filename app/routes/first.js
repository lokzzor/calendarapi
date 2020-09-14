const express = require('express');
const router = express.Router()
let cfg = require('../config/db.config');
const { Pool, Client } = require('pg')

if (cfg.enable) {
    const pool =new Pool (cfg.pool);

    router.get('/room', function (req, res, next) {
        pool.query("SELECT room_name, building_number, room_number, capacity, description FROM room_", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/event', function (req, res, next) {
        pool.query("SELECT event_id, room_name, event_name, person_id, first_date, time_start, time_end, day_of_week, last_date, admin_id FROM event_;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/event_count', function (req, res, next) {
        pool.query("SELECT event_id, room_name, event_name, person_id, first_date, time_start, time_end, day_of_week, last_date, admin_id FROM event_ Where admin_id =null;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });  
    router.get('/user', function (req, res, next) {
        pool.query("SELECT person_id, person_name, email, is_admin, is_active FROM person_;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    }); 
    router.get('/dictionary', function (req, res, next) {
        pool.query("SELECT event_name FROM event_dictionary;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });  
}
module.exports = router 
