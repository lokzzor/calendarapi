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
            
            if(response.data.weather[0].icon ="01d"){ weather.icon_url= "/static/01d.svg";}
            else if(response.data.weather[0].icon ="01n"){ weather.icon_url= "/static/01n.svg";}
            else if(response.data.weather[0].icon ="02d"){ weather.icon_url= "/static/02d.svg";}
            else if(response.data.weather[0].icon ="02n"){ weather.icon_url= "/static/02n.svg";}
            else if(response.data.weather[0].icon ="03d" || response.data.weather[0].icon =="03n"){ weather.icon_url= "/static/03d.svg";}
            else if(response.data.weather[0].icon ="04d" || response.data.weather[0].icon =="04n"){ weather.icon_url= "/static/03d.svg";}
            else if(response.data.weather[0].icon ="09d" || response.data.weather[0].icon =="09n"){ weather.icon_url= "/static/09d.svg";}
            else if(response.data.weather[0].icon ="10d"){ weather.icon_url= "/static/10d.svg";}
            else if(response.data.weather[0].icon ="10n"){ weather.icon_url= "/static/9n.svg";}
            else if(response.data.weather[0].icon ="11d" || response.data.weather[0].icon=="11n"){ weather.icon_url= "/static/11d.svg";}
            else if(response.data.weather[0].icon ="13d" || response.data.weather[0].icon=="13n"){ weather.icon_url= "/static/13d.svg";}
            else if(response.data.weather[0].icon ="50d" || response.data.weather[0].icon=="50n"){ weather.icon_url= "/static/50d.svg";}
            else {weather.icon_url="other"}
            
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
