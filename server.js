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
  res.header("Access-Control-Allow-Headers", "authorization, X-Requested-With, Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();   
});

/* Routes */
app.get("/", (req, res) => { res.json({ message: "Welcome to application." }) });
app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/get', require('./app/routes/first'));
app.use('/api/get', require('./app/routes/calendar'));

/* PORT */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });