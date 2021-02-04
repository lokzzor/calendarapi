const { Pool } = require('pg'); let cfg = require('../config/db.config'); const pool = new Pool (cfg.pool);
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const { validationResult } = require('express-validator');

class User{
    async ConectionToBase (req,res){
        try{
            await pool.query("SELECT NOW()", function (err, result) {
                if (err) { return res.send(String(err).replace('error:', '')) } else { res.send(result.rows) }
            });
        } catch(e) {
            res.status(500).json({ message: 'База лежит'});
            console.log("База лежит!!")
        }
    }
    async FirstStart (req,res){
        try{
            const admin = await pool.query("SELECT login_name FROM person_ where login_name ='admin'");
            const guest = await pool.query("SELECT login_name FROM person_ where login_name ='guest'");
            const hashPassword= await bcrypt.hashSync('admin', 8);

            if (admin.rows.length == 0){ 
                await pool.query("INSERT INTO person_( login_name, login_pass, person_name, email, is_admin, is_active) VALUES ($1,$2,$3,$4,$5,$6)", ['admin', hashPassword, 'admin', 'admin@jinr.ru', true, true]);
            }
            if (guest.rows.length == 0){ 
                await pool.query("INSERT INTO person_( login_name, login_pass, person_name, email, is_admin, is_active) VALUES ($1,$2,$3,$4,$5,$6)", ['guest', hashPassword, 'guest', 'guest@jinr.ru', false, true]);
            }
        } catch(e) {
            res.status(500).json({ message: 'Проблемма с первыми юзерами'});
        }
    }

    async CreateUser (req,res){
        try{
            const {login_name, login_pass, person_name, email, is_admin, is_active} = req.body.state;
            let user = await pool.query("SELECT login_name FROM person_ where login_name =$1", [login_name]);
            if (!user.rows.length == 0){ 
                return res.status(404).json({message: 'User with name alredy exist'})
            }
            const hashPassword= await bcrypt.hashSync(login_pass, 8);
            await pool.query("INSERT INTO person_( login_name, login_pass, person_name, email, is_admin, is_active) VALUES ($1,$2,$3,$4,$5,$6)", [login_name, hashPassword, person_name, email, is_admin, is_active], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }                
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок регистрация'})
        }
    }

    async UpdatePassword (req,res){
        try{
            const { login_name, change_password } = req.body.state;
            const hashPassword= await bcrypt.hashSync(change_password, 8);
            await pool.query("UPDATE person_ SET login_pass=$1 WHERE person_name=$2", [hashPassword, login_name], (err, result) => {
                if (err) { var a = []; a[0] = String(err).replace('error:', ''); console.log("Ругань с базы -- "+err); return res.status(500).json({ message: a })} else { res.send(result.rows); }                
            });
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок обновлени пароля'})
        }
    }

    async Login (req,res){
        try{
            const {login, password} = req.body;
            const errors = validationResult(req);
/*             if(!errors.isEmpty()){
                return res.status(401).json({ errors: errors.array() });
            } */
            const user = await pool.query("SELECT login_name, login_pass, person_name, email, is_admin, is_active FROM person_ where login_name =$1", [login]);
            if (user.rows.length == 0){ 
                return res.status(404).json({ message: "User not found"})
                //res.send({ message: 'User not found'})
            }
            const isPassValid = bcrypt.compareSync(password, user.rows[0].login_pass);
            if (!isPassValid){
                return res.status(400).json({message: "Invalid password"})
                //res.send({ message: 'Invalid password'})
            }
            const token = jwt.sign(
                { login_name:user.rows[0].login_name},
                cfg.secret,
                { expiresIn:'3h'}
            )
            return res.json({
                token,
                user: {
                    loginName: user.rows[0].login_name,
                    personName: user.rows[0].person_name,
                    email: user.rows[0].email,
                    isAdmin: user.rows[0].is_admin,
                    isActive: user.rows[0].is_active
                }
            })
        } catch(e) {
            res.send({ message: 'Что то пошло не так смотреть блок логин'})
        }
    }
    async UpdateAuth (req,res){
        try{        
            const user = await pool.query("SELECT login_name, login_pass, person_name, email, is_admin, is_active FROM person_ where login_name ="+"'"+req.user.login_name+"'");
            if (user.rows.length == 0){ 
                return res.status(404).json({ message: "User not found"})
            }
            const token = jwt.sign(
                { login_name:user.rows[0].login_name},
                cfg.secret,
                { expiresIn:'2h'}
            )
            return res.json({
                token,
                user: {
                    loginName: user.rows[0].login_name,
                    personName: user.rows[0].person_name,
                    email: user.rows[0].email,
                    isAdmin: user.rows[0].is_admin,
                    isActive: user.rows[0].is_active
                }
            })
        } catch(e) {
            console.log(e);
            res.send({ message: 'проверка токкена'})
        }
    }

}
module.exports = new User()