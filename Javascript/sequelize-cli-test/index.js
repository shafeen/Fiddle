let inquirer = require('inquirer');
let argv = require('yargs').argv;
let Sequelize = require('sequelize');

let sequelize = new Sequelize({
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './db.sqlite3'
});

let dbSetup = require('./config/dbSetup');
dbSetup(sequelize);


function doMenuPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenuAction',
            message: 'Main Menu',
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Create a user',
                    value: 'createuser'
                },
                {
                    name: 'Go to a User profile',
                    value: 'gotouser'
                },
                {
                    name: 'Create a budget',
                    value: 'createbudget'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        }
    ]).then(function (answers) {
        console.log(answers);
        switch (answers.mainMenuAction) {
            case 'createuser':
                console.log('creating a new user...');
                let createUser = require('./routes/createUser');
                createUser(inquirer, sequelize).then(function (newUser) {
                    if (newUser) {
                        console.log(`created a user with the email ${newUser.get('email')}`);
                    } else {
                        console.log('a user with that email already exists!');
                    }
                    return doMenuPrompt();
                });
                break;
            case 'gotouser':
                console.log('displaying user list...');
                break;
            case 'createbudget':
                console.log('creating a new budget...');
                let createBudget = require('./routes/createBudget');
                createBudget(inquirer, sequelize).then(function (newBudget) {
                    if (newBudget) {
                        console.log(`created a budget with the name ${newBudget.get('name')}`);
                    } else {
                        console.log('couldn\'t create a budget!');
                    }
                    return doMenuPrompt();
                });
                break;
            case 'quit':
                console.log('quitting...');
                break;
            default:
                break;
        }

    });
}

doMenuPrompt();


















