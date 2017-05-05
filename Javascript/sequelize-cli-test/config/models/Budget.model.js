let Sequelize = require('sequelize');

module.exports = function(sequelize, User) {
    let Budget = sequelize.define('budget', {
        type: Sequelize.STRING,
        amount: Sequelize.INTEGER
    });
    Budget.hasMany(User);
    return Budget;
};
