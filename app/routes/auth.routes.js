const express = require('express');
const router = express.Router()

const checkToken = require('../middleware/checkToken')
const ldap = require('../middleware/login_ldap');
const bcrypt = require ('bcrypt');
let cfg = require('../config/db.config');

const jwt = require('jsonwebtoken');

const generateAccessToken = () => {
    //return jwt.sign(,cfg.secret)
}
router.post('/login', async function (req, res, next) {
    const body = req.body;
    const hashPassword= await bcrypt.hashSync(req.body.ss.password, 10);
    console.log(hashPassword);
    var passwordIsValid = await bcrypt.compareSync(req.body.ss.password, hashPassword);
    if (!passwordIsValid) {
        console.log("bad")
    }
    const token = generateAccessToken();
});


/* const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");

const controller = require("../controllers/auth");
const controller2 = require("../controllers/user");

router.post('/signup',[verifySignUp.checkDuplicateUsernameOrEmail], controller.signup );

router.post("/signin", controller.signin);


router.get("/test/all", controller2.allAccess);

router.get("/test/user", controller2.userBoard );

router.get("/test/admin", [authJwt.verifyToken , authJwt.isAdmin ], controller2.adminBoard); */

module.exports = router 
