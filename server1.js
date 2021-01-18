const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cfg = require("./app/config/db.config"); // database

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

/* Routes */
app.get("/", (req, res) => { res.json({ message: "Welcome to application." }) });
app.use('/api/auth', require('./app/routes/auth'));
app.use('/api/get', require('./app/routes/weather'));
app.use('/api/event', require('./app/routes/dictinary'));

app.use('/api/get', require('./app/routes/first'));
app.use('/api/get', require('./app/routes/calendar'));


/* PORT */
const PORT = process.env.PORT || 1111;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });