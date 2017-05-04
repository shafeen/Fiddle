let Sequelize = require('sequelize');
// Requires an initialized sequelize connection
module.exports = function (sequelize) {
    let User = require('./user.model')(sequelize);
    let Address = sequelize.define('address', {
        address: Sequelize.STRING
    });
    Address.hasMany(User, {as: 'occupant'});
    return Address;
};
