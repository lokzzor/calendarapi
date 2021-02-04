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
}
module.exports = new Event()