let Sequelize = require('sequelize');

function setupTables(sequelize) {
    let User = require('./models/User.model')(sequelize);
    let Budget = require('./models/Budget.model')(sequelize);
    setupRelations(sequelize, User, Budget);
    return sequelize.sync();
}

function setupRelations(sequelize, User, Budget) {
    // set the n:m associations between the models
    Budget.belongsToMany(User, {through: 'UserBudgets'});
    User.belongsToMany(Budget, {through: 'UserBudgets'});
}

module.exports = setupTables;