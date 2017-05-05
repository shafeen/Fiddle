let dbSetup = require('../config/dbSetup');

function createUser(inquirer, sequelize) {
    let User = require('../config/models/User.model')(sequelize);
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'useremail',
            message: 'user email:'
        }
    ]).then(function (answers) {
        return dbSetup(sequelize).then(function () {
            // warning: validate for any empty emails provided
            // warning: check if a user already exists with the same email --> in validation
            return User.findOne({
                where: {
                    email: answers.useremail
                }
            });
        })
    }).then(function (existingUser) {
        if (existingUser) {
            console.log('a user with that email already exists!');
            return null;
        } else {
            return User.create({
                email: answers.useremail
            });
        }
    });
}

module.exports = createUser;
