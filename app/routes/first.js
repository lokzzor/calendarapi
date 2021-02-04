const express = require('express');
const router = express.Router()
let cfg = require('../config/db.config');
const { Pool } = require('pg')

if (cfg.enable) {
    const pool =new Pool (cfg.pool);
    /* router.get('/conectionbase', async (req, res, next) => {
        try{
            await pool.query("SELECT room_name, building_number, room_number, capacity, description FROM room_", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    });
    router.get('/room', async (req, res, next) => {
        try{
            await pool.query("SELECT room_name, building_number, room_number, capacity, description FROM room_", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    });

    router.get('/event', async (req, res, next) => {
        try{
            await pool.query("SELECT event_id, room_name, event_name, person_id, first_date, time_start, time_end, day_of_week, last_date, admin_id FROM event_;", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    });
    router.get('/event_count', async (req, res, next) => {
        try{
            await pool.query("SELECT event_id, room_name, event_name, person_id, first_date, time_start, time_end, day_of_week, last_date, admin_id FROM event_ Where admin_id =null;", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    });  
    router.get('/user', async (req, res, next) => {
        try{
            await pool.query("SELECT person_id, person_name, email, is_admin, is_active FROM person_;", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    }); 
    router.get('/dictionary', async (req, res, next) => {
        try{
            await pool.query("SELECT event_name FROM event_dictionary;", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    });
    router.get('/itemevent', async (req, res, next) => {
        try{
            await pool.query("SELECT event_name FROM event_dictionary;", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    }); */
}
module.exports = router 
