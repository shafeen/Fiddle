let Sequelize = require('sequelize');

function setupTables(sequelize) {
    let User = require('./models/User.model')(sequelize);
    let Budget = require('./models/Budget.model')(sequelize);
    // set the n:m associations between the models
    Budget.belongsToMany(User, {through: 'UserBudgets'});
    User.belongsToMany(Budget, {through: 'UserBudgets'});

    return sequelize.sync();
}

module.exports = setupTables;