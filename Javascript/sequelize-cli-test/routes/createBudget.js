let dbSetup = require('../config/dbSetup');

function createBudget (inquirer, sequelize) {
    let User = require('../config/models/User.model')(sequelize);
    let Budget = require('../config/models/Budget.model')(sequelize);
    // TODO: should need to NOT do this manually every time
    Budget.belongsToMany(User, {through: 'UserBudgets'});
    User.belongsToMany(Budget, {through: 'UserBudgets'});

    // inquire about what user we want to create a budget for
    // retrieve the list of users currently in the system and display their names for selection
    // TODO: complete this function
    return User.findAll()
    .then(function (users) {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'userSelected',
                message: 'Which user is this budget for?',
                choices: users.map(user => {
                    return {
                        name: user.get('email'),
                        value: user.get('id')
                    }
                })
            }
        ])
    }).then(function (answers) {
        console.log(`you selected user id#${answers.userSelected}`);
        // TODO: determine the budget type and name later
        return dbSetup(sequelize).then(function () {
            /// TODO: all these variables need to be gotten from the user
            return Budget.create({
                name: `userid#${answers.userSelected} budget`,
                type: 'weekly',
                amount: 10
            }).then(function(budget) {
                // we've elected not to care that this is asynchronous
                budget.setUsers([answers.userSelected]);
                return budget;
            })
        });
    }).catch(function(reason) {
        console.log(reason);
    });


}

module.exports = createBudget;