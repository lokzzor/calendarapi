/* PosgeSQL */

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://calendar:calendar@localhost:5432/calendardb', {
    dialect: 'postgres',
    "logging": false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
}); 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../model/User.js')(sequelize, Sequelize);
exports.db;
module.exports = sequelize;