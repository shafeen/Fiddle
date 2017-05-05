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

let usernamePrompt = {
    type: 'input',
    name: 'username',
    message: 'Username:'
};
let passwordPrompt = {
    type: 'password',
    name: 'password',
    message: 'Password:',
    mask: '*'
};

// inquirer.prompt([usernamePrompt, passwordPrompt]).then((answers) => {
//     console.log(answers);
// });

let dbSetup = require('./config/dbSetup');
dbSetup(sequelize);



inquirer.prompt([
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
            }
        ],
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
                }
            });
            break;
        case 'gotouser':
            console.log('displaying user list...');
            break;
        case 'createbudget':
            console.log('creating a new budget...');
            break;
        default:
            break;
    }
    
});
















