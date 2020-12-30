const express = require('express');
const router = express.Router()
let cfg = require('../config/db.config');
const axios = require('axios').default;
const { Pool, Client } = require('pg')

if (cfg.enable) {
    const pool =new Pool (cfg.pool);

    router.get('/room', async function (req, res, next) {
        await pool.query("SELECT room_name, building_number, room_number, capacity, description FROM room_", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/room_event', async function (req, res, next) {
        await pool.query("SELECT room_name, COUNT(event_name) as countevent FROM event_ GROUP BY room_name;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/room_building', async function (req, res, next) {
        await pool.query("SELECT building_number, COUNT(room_number) FROM room_ GROUP BY building_number", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/event', async function (req, res, next) {
        await pool.query("SELECT event_id, room_name, event_name, person_id, first_date, time_start, time_end, day_of_week, last_date, admin_id FROM event_;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/event_count', async function (req, res, next) {
        await pool.query("SELECT event_id, room_name, event_name, person_id, first_date, time_start, time_end, day_of_week, last_date, admin_id FROM event_ Where admin_id =null;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });  
    router.get('/user', async function (req, res, next) {
        await pool.query("SELECT person_id, person_name, email, is_admin, is_active FROM person_;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    }); 
    router.get('/dictionary', async function (req, res, next) {
        await pool.query("SELECT event_name FROM event_dictionary;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });
    router.get('/itemevent', async function (req, res, next) {
        await pool.query("SELECT event_name FROM event_dictionary;", function (err, result) {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
        });
    });

    router.get('/weather', async function (req, res, next) {
        const api_key='596876ae90ac6935eb72f9671488da95';
        const id_key='Dubna';
        
        await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+id_key+'&appid='+api_key+'&units=metric')  .then(function (response) {
            // handle success
            //console.log(response.data);
            var weather={};
            weather= new Object();
            weather.wind=response.data.wind.speed
            weather.temp=Math.round(response.data.main.temp);
            weather.tempfeels_like=Math.round(response.data.main.feels_like);
            weather.vlag=response.data.main.humidity;
            weather.wind=Math.round(response.data.wind.speed);
            weather.clouds=Math.round(response.data.clouds.all);
            weather.descrip=response.data.weather[0].description;
            weather.main=response.data.weather[0].main;
            weather.icon=response.data.weather[0].icon;
            weather.background="";
            weather.icon_obj=response.data.weather[0].icon;   
            res.send(weather);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            var a = []; a[0] = String(err).replace('error:', ''); return res.send(a);
          })
    })
}
module.exports = router 
