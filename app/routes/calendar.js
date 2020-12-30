const express = require('express');
const router = express.Router()

let cfg = require('../config/db.config');
const { Pool, Client } = require('pg')
const moment =require('moment');

if (cfg.enable) {
    const pool =new Pool (cfg.pool);

    router.get('/calendarselect', async function (req, res, next) {
        await pool.query("SELECT *  FROM event_", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });


    router.get('/scalendarselect', async function (req, res, next) {
        await pool.query("SELECT event_id,room_name, event_name, person_id, event_start, event_end  FROM event_ WHERE event_start::Date=current_date", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });


    router.get('/calendarselectroom', async function (req, res, next) {
        await pool.query("SELECT room_name FROM room_", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.post('/calendarpostevent', async function (req, res, next) {
        const body = req.body.state; let start = moment(body.event_start).format("YYYY-MM-DD h:mm:ss"); let end = moment(body.event_end).format("YYYY-MM-DD h:mm:ss"); 
        await pool.query("INSERT INTO event_ ( room_name, event_name, person_id, event_start, event_end) VALUES ('"+body.room_name+"','"+body.event_name+"',"+3+",'"+start+"','"+end+"');", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
}

module.exports = router 
