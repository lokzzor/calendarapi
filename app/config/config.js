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

module.exports = sequelize;