let Sequelize = require('sequelize');
let User = require('./user.model');

// Requires an initialized sequelize connection
module.exports = function (sequelize) {
    let Address = sequelize.define('address', {
        address: Sequelize.STRING
    });
    Address.hasMany(User, {as: 'occupant'});
    return Address;
};
