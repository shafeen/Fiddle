(function () {
    const ApolloBoost = require('apollo-boost');
    console.log(ApolloBoost);
    const ApolloClient = ApolloBoost.default;
    window.apolloClient = new ApolloClient();
    window.gql =  ApolloBoost.gql;

    function runQuery(client) {
        const gql = ApolloBoost.gql;

        client.query({
            query: gql`
                query AllBooksAndAuthors {
                    books {
                        title
                        author {
                            name
                        }
                    }
                    authors {
                        name
                    }
                }
            `
        })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }

    console.log('loading the apollo client');
    runQuery(window.apolloClient);
})();

