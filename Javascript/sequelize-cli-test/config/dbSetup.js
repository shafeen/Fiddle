let Sequelize = require('sequelize');

function setupTables(sequelize) {
    let User = require('./models/User.model')(sequelize);
    let Budget = require('./models/Budget.model')(sequelize, User);
    return sequelize.sync();
}

module.exports = setupTables;