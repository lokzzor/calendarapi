const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/config');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');

process.env.SECRET="sadda";
app.use(cors()); // any domains
app.use(morgan(('dev')));
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

/* Headers */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();   
});
/*  */

/* Controllers */
const auth = require('./app/router/auth');
app.use('/api/auth', auth);
/*  */

/* Routes */
/* app.post('/api/user/create', userController.createUser);
app.post('/api/user/login', userController.logIn); */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
/*  */

const Port=3000;
db.sync({ /* force: true */ }).then(function(){
    app.listen(Port, () => { console.log(`Server is running on port ${Port}.`); });
})