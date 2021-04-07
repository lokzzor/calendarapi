const { Pool } = require('pg'); let cfg = require('../config/db.config'); const pool = new Pool (cfg.pool);

class Event{
    async getCalendarNewEvent (req,res){
        try{
            await pool.query("SELECT count(*) FROM event_ where admin_login is NULL", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок header количество событий'})
        }
    }
    async getRoomName (req,res){
        try{
            await pool.query("SELECT room_name FROM room_", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так вывод комнат'})
        }
    }
    async getRoomNameMas (req,res){
        try{
            await pool.query("SELECT array_agg(room_name) FROM room_;", (err, result) => {
                if (err) { var a = []; a[0] = "Error"; return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так вывод комнат'})
        }
    }
    async Chart1 (req,res){
        try{
            await pool.query("SELECT room_name, COUNT(event_name) as countevent FROM event_ GROUP BY room_name;", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    }
    async Chart2 (req,res){
        try{
            await pool.query("SELECT building_number, COUNT(room_number) FROM room_ GROUP BY building_number", function (err, result) {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок общее'})
        }
    }
    /* EVENT */
    async EventNew (req,res){
        try{

            await pool.query("SELECT *  FROM event_ Where admin_login is NULL;", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы EventNew -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
            }); 

        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок EventNew'})
        }
    }
    async EventOld (req,res){
        try{
            await pool.query("SELECT *  FROM event_ Where admin_login is not NULL;", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы EventOld -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок EventOld'})
        }
    }
    async EventSearch (req,res){
        try{
            await pool.query("SELECT *  FROM event_ Where event_name LIKE $1", [req.body.state+'%'], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы EventSearch -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }                
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок поиска событий'})
        }
    }
    async Remove (req,res){
        try{
            await pool.query("DELETE FROM event_ WHERE event_id=$1", [req.body.state], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы Remove -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }                
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок удаления событий'})
        }
    }
    async Ok (req,res){
        try{
            const {user, eventid} = req.body.state;
            await pool.query("UPDATE event_ SET admin_login=$1 WHERE event_id=$2", [ user, eventid ], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы Ok -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }                
            }); 
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок одобрения событий'})
        }
    }
}
module.exports = new Event()
