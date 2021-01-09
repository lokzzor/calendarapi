const express = require('express');
const router = express.Router()

let cfg = require('../config/db.config');
const { Pool, Client } = require('pg')
const moment =require('moment');

if (cfg.enable) {
    const pool =new Pool (cfg.pool);

    router.get('/calendarselect', async (req, res, next) => {
        try{
            await pool.query("SELECT *  FROM event_", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок календарь'})
        }
    });


    router.get('/scalendarselect', async (req, res, next) => {
        try{
            await pool.query("SELECT *  FROM event_ WHERE event_start::Date=current_date", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок календарь'})
        }
    });


    router.get('/calendarselectroom', async (req, res, next) => {
        try{
            await pool.query("SELECT room_name FROM room_", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок календарь'})
        }
    });
    router.post('/calendarpostevent', async (req, res, next) => {
        try{
            const body = req.body.state; let start = moment(body.event_start).format("YYYY-MM-DD h:mm:ss"); let end = moment(body.event_end).format("YYYY-MM-DD h:mm:ss"); 
            await pool.query("INSERT INTO event_ ( room_name, event_name, person_id, event_start, event_end) VALUES ('"+body.room_name+"','"+body.event_name+"',"+3+",'"+start+"','"+end+"');", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок календарь'})
        }
    });
}

module.exports = router 
