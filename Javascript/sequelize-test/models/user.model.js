let Sequelize = require('sequelize');

// Requires an initialized sequelize connection
module.exports = function (sequelize) {
    return sequelize.define('user', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
    });
};
