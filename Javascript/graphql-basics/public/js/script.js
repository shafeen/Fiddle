var ApolloBoost = require('apollo-boost');
console.log(ApolloBoost);
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient();

window.client = client;

function testFunction() {
    console.log('this is just a test javascript function');
}
testFunction();

function runQuery(client) {
    const gql = ApolloBoost.gql;

    client.query({
        query: gql`
            query AllBooks {
                books {
                    author
                    title
                }
            }
        `
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

runQuery(client);