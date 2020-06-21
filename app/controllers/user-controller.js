const db = require('../config/config.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);
const jwt = require('jsonwebtoken');


module.exports.createUser = function(req, res){
	// проверку на существующую надо добавить
	var password = bcrypt.hashSync(req.body.password, salt);
    var query = "INSERT INTO users (username, last_name, email, password, role) VALUES ('"+ 
    req.body.username +"', '"+ req.body.lastname +"', '"+ req.body.email +"', '"+ password +"', '"+ req.body.role + "')";
    db.query(query).spread(function(result, metadata){
        res.status(201).send("User was successfully created.");
    }).catch(function(err){
        res.status(500).send("User was not created.");
    })
}

module.exports.logIn = function(req, res){
    var submittedPassword = req.body.password;

    var query = "SELECT * FROM users WHERE username='"+ req.body.email +"' OR email='"+ req.body.email + "'";
    db.query(query).spread(function(result, metadata){
        if(result.length > 0){
            var userData = result[0];
            var isVerified = bcrypt.compareSync(submittedPassword, userData.password);
            console.log(isVerified);
            var token = jwt.sign(userData, process.env.SECRET, {
                expiresIn: 60*60*24
            })
            if(isVerified){

                res.json({
                    userData: userData,
                    token: token
                });
            } else {
                res.status(400).send("Incorrect Password");
            }
        }

    }).catch(function(){
        res.status(500).send("Unable to process the query.");
    })
}


/* 
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.signup = async (req, res) => {
	const candidate = await User.findOne({ where: {email:req.body.email} })
	if(candidate){
		res.status(409).json({
			message: 'Почта занята попробуйте другую.'
		})
	} else{
		User.create({
			username: req.body.username,
			email: req.body.email,
			last_name: req.body.lastname,
			role: req.body.role,
			password: bcrypt.hashSync(req.body.password, 8)
		}).then( newUser =>  {
			 res.send("New User saved to database");
		  })
			.catch(err => {
			  console.log(err);
			  res.status(400).send("unable to save this newUser to database");
			})
		
	}
	// Save User to Database
/* 	User.create({
		username: req.body.username,
        email: req.body.email,
        last_name: req.body.lastname,
        role: req.body.role,
		password: bcrypt.hashSync(req.body.password, 8)
    }).then(res=>{
       console.log("GOOD");

      }).catch(err=>console.log(err)); */
    /* .then(user => {
		Role.findAll({
			where: {
				name: {
					[Op.or]: req.body.roles
				}
			}
		}).then(roles => {
			user.setRoles(roles).then(() => {
				res.send({ message: 'Registered successfully!' });
			});
		}).catch(err => {
			res.status(500).send({ reason: err.message });
		});
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	}) 
}
exports.login = (req, res) => {

}
 */