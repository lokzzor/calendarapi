const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cfg = require("./app/config/db.config"); // database
let path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors({ allowedOrigins: cfg.allowed }));

/* Headers */ 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "authorization, X-Requested-With, Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();   
});
app.use('/static', express.static('public/images'));


/* Routes */
app.get("/", (req, res) => { res.json({ message: "Welcome to application." }); });

const auth = require('./app/routes/auth.routes');
const first = require('./app/routes/first');
/* app.use('/api/auth', auth);  */
app.use('/api/get', first); 

/* PORT */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });

/* INSERT INTO public.event_(
	event_id, event_name, first_date, time_start, time_end, day_of_week, last_date, room_name, person_id, admin_id)
	VALUES (1, 'first', '1995-12-13', '13:44', '15:55', 2, '1995-12-14', 'new', 47, 1); */