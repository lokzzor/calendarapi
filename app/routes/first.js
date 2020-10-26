const express = require('express');
const router = express.Router()
let cfg = require('../config/db.config');
const axios = require('axios').default;
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
    router.get('/weather', function (req, res, next) {
        const api_key='596876ae90ac6935eb72f9671488da95';
        const id_key='Dubna';
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+id_key+'&appid='+api_key+'&units=metric')  .then(function (response) {
            // handle success
            var weather={};
            weather= new Object();
            weather.cloud=response.data.clouds.all
            weather.wind=response.data.wind.speed
            weather.temp=Math.round(response.data.main.temp);
            weather.tempfeels_like=Math.round(response.data.main.feels_like);
            weather.vlag=response.data.main.humidity;
            weather.descrip=response.data.weather[0].description;
            weather.main=response.data.weather[0].main;
            weather.icon=response.data.weather[0].icon;
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
