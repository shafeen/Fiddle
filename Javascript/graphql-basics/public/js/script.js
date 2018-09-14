var ApolloBoost = require('apollo-boost');
console.log(ApolloBoost);
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient();

window.client = client;

function testFunction() {
    console.log('this is just a test javascript function');
}
testFunction();
