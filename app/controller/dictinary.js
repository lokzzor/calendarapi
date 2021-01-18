const { Pool } = require('pg'); let cfg = require('../config/db.config'); 
const pool = new Pool (cfg.pool);
const moment =require('moment');


class Dictinary{
    async CreateEvent (req,res){
        try{
            const {event_name, room_name, person_name, date1, date2, event_start, event_end,checkedAll,checkedRepeat} = req.body.state; var start; var end;  var admin_login;              
                if(!person_name=='Guest'){admin_login=person_name } else{ admin_login=null; }
                if(checkedAll==true){
                    start = date1.replace('T', ' ');
                    end = date2.replace('T', ' ');
                }
                else if(checkedAll==false){
                    if(event_start=='') { start=date1.replace('T', ' ');} else  start=event_start.replace('T', ' ');
                    if(event_end=='') { end=date2.replace('T', ' ');} else  end=event_end.replace('T', ' ');
                }
            await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_name, start, end, admin_login], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.send(a) } else { console.log("Событие созданно"); res.send(result.rows); }
            });
        } catch(e) {
            console.log("блок создания событий --"+e)
            res.status(500).json({ message: 'Что то пошло не так смотреть блок словарь создание события'})
        }
    }
    async CreateRoom (req,res){
        try{
            const body = req.body.state;
            await pool.query("INSERT INTO event_ ( room_name, event_name, person_id, event_start, event_end) VALUES ('"+body.room_name+"','"+body.event_name+"',"+3+",'"+start+"','"+end+"');", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок словарь создание комнаты'})
        }
    }
} 
module.exports = new Dictinary()
