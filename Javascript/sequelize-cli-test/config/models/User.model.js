let Sequelize = require('sequelize');

module.exports = function(sequelize) {
    let User = sequelize.define('user', {
        email: Sequelize.STRING,
    });
    return User;
};
