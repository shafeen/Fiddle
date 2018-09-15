module.exports = function () {
    const { ApolloServer, gql } = require('apollo-server-express');
    const books = [
        {
            title: 'Harry Potter and the Philosopher\'s Stone',
            author: 'J.K. Rowling',
        },
        {
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
        },
        {
            title: 'Jurassic Park',
            author: 'Michael Crichton',
        },
        {
            title: 'No Excuses!',
            author: 'Brian Tracy',
        },
        {
            title: 'The 4-Hour Workweek',
            author: 'Tim Ferriss',
        },
        {
            title: 'I, Robot',
            author: 'Issac Asimov',
        },
        {
            title: 'The Lost World',
            author: 'Michael Crichton',
        },
    ];
    const typeDefs = gql`
        # Comments in GraphQL are defined with the hash (#) symbol.

        # This "Book" type can be used in other type declarations.
        type Book {
            title: String
            author: String
        }

        # The "Query" type is the root of all GraphQL queries.
        # (A "Mutation" type will be covered later on.)
        type Query {
            books: [Book]
        }
    `;
    const resolvers = {
        Query: {
            books: () => books,
        },
    };
    return new ApolloServer({ typeDefs, resolvers });
};