const express = require('express');
const router = express.Router()
const controller = require('../controllers/user-controller');

router.post('/register', controller.createUser);
router.post('/login', controller.logIn);

/*

 router.get('/users',  controller.getUsers)
router.get('/users/:id',  controller.getUserById)
router.post('/users',   controller.createUser)
router.put('/users/:id',  controller.updateUser)
router.delete('/users/:id',  controller.deleteUser)

*/
module.exports = router 