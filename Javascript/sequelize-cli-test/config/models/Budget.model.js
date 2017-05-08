let Sequelize = require('sequelize');

module.exports = function(sequelize) {
    let Budget = sequelize.define('budget', {
        name: Sequelize.STRING,
        type: Sequelize.STRING,
        amount: Sequelize.INTEGER
    });
    return Budget;
};
