const { Pool } = require('pg'); let cfg = require('../config/db.config'); 
const pool = new Pool (cfg.pool);
const moment =require('moment-timezone');


class Dictinary{
    async CreateEvent (req,res){
        try{
            const {event_name, room_name, person_login, event_start, event_end,checkedRepeat} = req.body.state;  let start; let end;            
            start = moment(event_start).tz("Europe/Moscow").format('YYYY-MM-DD HH:mm');
            end = moment(event_end).tz("Europe/Moscow").format('YYYY-MM-DD HH:mm');
            console.log(person_login)
            if(person_login!=='Guest'){
                const user = await pool.query("SELECT *  FROM person_ Where login_name=$1 and is_admin = true", [person_login]); // есть ли права
                if (user.rows.length == 0){
                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, person_login, start, end], (err, result) => {
                        if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
                    }); 
                } else{
                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_login, start, end, person_login], (err, result) => {
                        if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
                    });  
                }
            } else{
                let personlogin='guest';
                await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, personlogin, start, end], (err, result) => {
                    if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
                });  
            }
        } catch(e) {
            console.log("блок создания событий --"+e)
            res.status(500).json({ message: 'Что то пошло не так смотреть блок словарь создание события'})
        }
    }
    async CreateRoom (req,res){
        try{
            const {room_name, building_number, room_number, capacity, description} = req.body.state;
            await pool.query("INSERT INTO room_ ( room_name, building_number, room_number, capacity, description) VALUES ($1,$2,$3,$4,$5)",[room_name, building_number, room_number, capacity, description ], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок словарь создание комнаты'})
        }
    }
} 
module.exports = new Dictinary()
