const { Pool } = require('pg'); let cfg = require('../config/db.config'); const pool = new Pool (cfg.pool);

class Calendar{
    async calendarSelect (req,res){
        try{
            await pool.query("SELECT *  FROM event_", (err, result) => {
                if (err) { var a = []; a[0] = "Error"; return res.send(a) } else { res.send(result.rows); }
            });

        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок календарь'})
        }
    }
    async sCalendarSelect (req,res){
        try{
            await pool.query("SELECT *  FROM event_ WHERE event_start::Date=current_date", (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы sCalendarSelect -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок события дня'})
        }
    }
}

module.exports = new Calendar()