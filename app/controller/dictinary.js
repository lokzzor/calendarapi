const { Pool } = require('pg'); let cfg = require('../config/db.config'); 
const pool = new Pool (cfg.pool);
const moment =require('moment-timezone');


class Dictinary{
    async CreateEvent (req,res){
        try{
            //console.log(req.body.state);
            const {event_name, room_name, person_login, event_start, event_end,checkedAll,checkedRepeat,repeatatintervals,repeatattime,checkedfinish,finishday,finishafter} = req.body.state;  
            let start = moment(event_start).tz("Europe/Moscow").format('YYYY-MM-DD HH:mm'); let end = moment(event_end).tz("Europe/Moscow").format('YYYY-MM-DD HH:mm');
            let fixstart = moment(event_start).tz("Europe/Moscow").format('YYYY-MM-DD 08:00'); let fixend = moment(event_end).tz("Europe/Moscow").format('YYYY-MM-DD 21:00');
            const user = await pool.query("SELECT * FROM person_ Where login_name=$1 and is_admin = true", [person_login]); let personlogin='guest';

            if(checkedRepeat === true && checkedAll === true){       repeat( fixstart, fixend ); }
            else if(checkedRepeat === true && checkedAll === false){ repeat( start, end ); }
            else if(checkedAll === true && checkedRepeat === false){ send( fixstart, fixend ); }
            else{                                                    send( start, end ); }

            async function repeat(first, second) {
                var tempstartmas=[];var tempendmas=[]; tempstartmas[0]=first; tempendmas[0]=second;
                if(checkedfinish===true){
                    if(repeatattime==='Day'){
                        for(let i=1;i<30;i++){
                            first = moment(first).tz("Europe/Moscow").add(repeatatintervals,'day').format('YYYY-MM-DD HH:mm');
                            second = moment(second).tz("Europe/Moscow").add(repeatatintervals,'day').format('YYYY-MM-DD HH:mm');
                            if(second <= finishday ){
                                tempstartmas[i]=first; tempendmas[i]=second;
                            }
                        }
                        if(tempstartmas.length<=0){
                            var a = []; a[0] = 'Meeting reoccurrence time is too short';
                            return res.status(500).json({ message: a })
                        } else{
                            for(let i=0;i<=tempstartmas.length-1;i++){
                                if(person_login!=='Guest'){
                                    if (user.rows.length === 0){
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i]], (err, result) => {
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы repeat-- "+err); return res.status(500).json({ message: a })} 
                                            else {res.send(result.rows);}
                                        }); 
                                    } else{
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i], person_login], (err, result) => {
                                            if(i==tempstartmas.length){ 
                                                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateEvent admin-- "+err); return res.status(500).json({ message: a })} 
                                                else {res.send(result.rows);}
                                            }
                                        });  
                                    }
                                } else{
                                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, personlogin, tempstartmas[i], tempendmas[i]], (err, result) => {
                                        if(i==tempstartmas.length){ 
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateEvent guest-- "+err);  return res.status(500).json({ message: a })} 
                                            else { res.send(result.rows);}
                                        }
                                    });  
                                }
                            }
                        }
                    } else{ //Week
                        for(let i=1;i<30;i++){
                            first = moment(first).tz("Europe/Moscow").add(repeatatintervals,'week').format('YYYY-MM-DD HH:mm');
                            second = moment(second).tz("Europe/Moscow").add(repeatatintervals,'week').format('YYYY-MM-DD HH:mm');
                            if(second <= finishday ){
                                tempstartmas[i]=first; tempendmas[i]=second;
                            } 
                        }
                        if(tempstartmas.length<=0){
                            var a = []; a[0] = 'Meeting reoccurrence time is too short';
                            return res.status(500).json({ message: a })
                        } else{
                            for(let i=0;i<=tempstartmas.length-1;i++){
                                if(person_login!=='Guest'){
                                    if (user.rows.length == 0){
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i]], (err, result) => {
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} 
                                            else {res.send(result.rows);}
                                        }); 
                                    } else{
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i], person_login], (err, result) => {
                                            if(i==tempstartmas.length){ 
                                                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateEvent  admin -- "+err); return res.status(500).json({ message: a })} 
                                                else {res.send(result.rows);}
                                            }
                                        });  
                                    }
                                } else{
                                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, personlogin, tempstartmas[i], tempendmas[i]], (err, result) => {
                                        if(i==tempstartmas.length){ 
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateEvent  guest-- "+err); return res.status(500).json({ message: a })} 
                                            else {res.send(result.rows);}
                                        }
                                    });  
                                }
                            }
                        }
                    }
                } else{
                    if(repeatattime==='Day'){
                        for(let i=1;i<=finishafter;i++){
                            first = moment(first).tz("Europe/Moscow").add(repeatatintervals,'day').format('YYYY-MM-DD HH:mm');
                            second = moment(second).tz("Europe/Moscow").add(repeatatintervals,'day').format('YYYY-MM-DD HH:mm');
                                tempstartmas[i]=first; tempendmas[i]=second;
                        }
                        if(tempstartmas.length<=0){
                            var a = []; a[0] = 'Meeting reoccurrence time is too short';
                            return res.status(500).json({ message: a })
                        } else{
                            for(let i=0;i<=tempstartmas.length-1;i++){
                                if(person_login!=='Guest'){
                                    if (user.rows.length === 0){
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i]], (err, result) => {
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err);  return res.status(500).json({ message: a })} 
                                            else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 100); }
                                        }); 
                                    } else{
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i], person_login], (err, result) => {
                                            if(i==tempstartmas.length){ 
                                                if (err) { var a = []; a[0] = String(err).replace('error:', '');  console.log("Ругань с базы CreateEvent  admin-- "+err);  return res.status(500).json({ message: a })} 
                                                else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 100); }
                                            }
                                        });  
                                    }
                                } else{
                                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, personlogin, tempstartmas[i], tempendmas[i]], (err, result) => {
                                        if(i==tempstartmas.length){ 
                                            if (err) { var a = []; a[0] = String(err).replace('error:', '');  console.log("Ругань с базы CreateEvent  guest-- "+err);  return res.status(500).json({ message: a })} 
                                            else { res.send(result.rows); }
                                        }
                                    });  
                                }
                            }
                        }
                    } else{
                        for(let i=1;i<=finishafter;i++){
                            first = moment(first).tz("Europe/Moscow").add(repeatatintervals,'week').format('YYYY-MM-DD HH:mm');
                            second = moment(second).tz("Europe/Moscow").add(repeatatintervals,'week').format('YYYY-MM-DD HH:mm');
                                tempstartmas[i]=first; tempendmas[i]=second;
                        }
                        if(tempstartmas.length<=0){
                            var a = []; a[0] = 'Meeting reoccurrence time is too short';
                            return res.status(500).json({ message: a })
                        } else{
                            for(let i=0;i<=tempstartmas.length-1;i++){
                                if(person_login!=='Guest'){
                                    if (user.rows.length == 0){
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i]], (err, result) => {
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} 
                                            else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 200); }
                                        }); 
                                    } else{
                                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_login, tempstartmas[i], tempendmas[i], person_login], (err, result) => {
                                            if(i==tempstartmas.length){ 
                                                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateEvent-- "+err); return res.status(500).json({ message: a })} 
                                                else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 200); }
                                            }
                                        });  
                                    }
                                } else{
                                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, personlogin, tempstartmas[i], tempendmas[i]], (err, result) => {
                                        if(i==tempstartmas.length){ 
                                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateEvent  guest-- "+err); return res.status(500).json({ message: a })} 
                                            else { res.send(result.rows); }
                                        }
                                    });  
                                }
                            }
                        }
                    }
                }
                tempstartmas=[];tempendmas=[];
                first=null; second=null;
            }
            async function send(first,second) {
                if(person_login!=='Guest'){
                    if (user.rows.length == 0){
                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, person_login, first, second], (err, result) => {
                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); /* console.log("Ругань с базы CreateEvent -- "+err); */ return res.status(500).json({ message: a })} 
                            else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 200); }
                        }); 
                    } else{
                        await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end, admin_login) VALUES ($1,$2,$3,$4,$5,$6)",[room_name, event_name, person_login, first, second, person_login], (err, result) => {
                            if (err) { var a = []; a[0] = String(err).replace('error:', ''); /* console.log("Ругань с базы CreateEvent -- "+err); */ return res.status(500).json({ message: a })} 
                            else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 200); }
                        });  
                    }
                } else{
                    await pool.query("INSERT INTO event_ (room_name, event_name, person_login, event_start, event_end) VALUES ($1,$2,$3,$4,$5)",[room_name, event_name, personlogin, first, second], (err, result) => {
                        if (err) { var a = []; a[0] = String(err).replace('error:', ''); /* console.log("Ругань с базы CreateEvent -- "+err); */ return res.status(500).json({ message: a })} 
                        else { setTimeout(() => { res.send(result.rows); ;res.end(); }, 200); }
                    });  
                }
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
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы CreateRoom -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок словарь создание комнаты'})
        }
    }
} 
module.exports = new Dictinary()