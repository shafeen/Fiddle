let Sequelize = require('sequelize');
// Requires an initialized sequelize connection
module.exports = function (sequelize) {
    let User = sequelize.define('user', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
    });
    return User;
};
