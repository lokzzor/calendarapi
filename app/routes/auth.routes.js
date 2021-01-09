const express = require('express');
const router = express.Router()

const checkToken = require('../middleware/checkToken')
let cfg = require('../config/db.config');
const { Pool, Client } = require('pg')
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

router.post('/createuser',  
[ 
    check('password','Password must be at longer that 3 and shorter then 16').isLength({ min: 3, max: 16}),
],
async (req, res, next) => { 
    const pool =new Pool (cfg.pool);
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Uncorrect request",errors});
        }
        const {login, password, person, email, admin, active} = req.body;
        const user = await pool.query("SELECT login_name, login_pass, person_name, email, is_admin, is_active FROM person_ where login_name ="+"'"+login+"'");
        console.log(user.rows)
        if (!user.rows.length == 0){ 
            return res.status(404).json({message: 'User with name alredy exist'})
        }
        const hashPassword= await bcrypt.hashSync(password, 12);
        await pool.query("INSERT INTO person_( login_name, login_pass, person_name, email, is_admin, is_active) VALUES ("+"'"+login+"','"+hashPassword+"','"+person+"','"+email+"',"+admin+","+active+")", (err, result) => {
            if (err) { var a = []; a[0] = String(err).replace('error:', ''); return res.send(a) } else { res.json({message: "User was created"}) }
        });
    } catch(e) {
        res.status(500).json({ message: 'Что то пошло не так смотреть блок регистрация'})
    }
});

router.post('/login', async (req, res, next) => { 
    const pool =new Pool (cfg.pool);
        try{
            const {login, password} = req.body;
            const user = await pool.query("SELECT login_name, login_pass, person_name, email, is_admin, is_active FROM person_ where login_name ="+"'"+login+"'");
            if (user.rows.length == 0){ 
                return res.status(404).json({message: 'User not found'})
            }
            const isPassValid = bcrypt.compareSync(password, user.rows[0].login_pass);
            if (!isPassValid){
                return res.status(400).json({message: 'Invalid password'})
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
            res.status(500).json({ message: 'Что то пошло не так смотреть блок авторизация'})
        }
});
module.exports = router