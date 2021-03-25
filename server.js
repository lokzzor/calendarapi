const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cfg = require("./app/config/db.config"); // database
const { Pool } = require('pg');
const moment =require('moment');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ allowedOrigins: cfg.allowed }));

/* Headers */ 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  next();   
});

/* Databasecheck */
const pool = new Pool (cfg.pool);
pool.on("connect", () => {
  pool.on('error', err => { console.log("Если была активна но потом вырубилась - "+err);    update(); });
});
pool.on("end", () => {
  console.log(moment().format('YYYY-MM-DD HH:mm')+" Connection End ");
});

(async () => {
  const client = await pool.connect()
  try {
    console.log(moment().format('YYYY-MM-DD HH:mm')+" Connected with Database " + cfg.pool.host + ":" + cfg.pool.port +" --- OK");
  } catch (e) {
    console.error('Connection error --- ', err.stack);
    client.release()
    throw e
  } finally {
    client.release()
  }
})().catch(e => console.error("Сразу выключена --- "+e.stack))

const update = async() => {
  const client = await pool.connect()
  try {
    console.log(moment().format('YYYY-MM-DD HH:mm')+" Connected with Database " + cfg.pool.host + ":" + cfg.pool.port +" --- OK");
  } catch (e) {
    console.error('Connection error --- ', err.stack);
    client.release()
    throw e
  } finally {
    client.release()
  }
}

/* Routes */
app.get("/", (req, res) => { res.json({ message: "Welcome to application." }) });
app.use('/api/auth', require('./app/routes/auth'));
app.use('/api/event', require('./app/routes/dictinary'));
app.use('/api/get', require('./app/routes/weather'));
app.use('/api/get', require('./app/routes/func-event'));
app.use('/api/get', require('./app/routes/calendar'));


/* PORT */
const PORT = process.env.PORT || 8444;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });