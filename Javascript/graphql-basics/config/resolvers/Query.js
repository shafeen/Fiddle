const books = require('./sampleData/books.json');
const authors = require('./sampleData/authors.json');

const Query = {
    book: (root, args, context, info) => {
        return books.filter(book => book.title === args.title)[0]
    },
    books: (root, args, context, info) => {
        return books;
    },
    authors: () => authors
};

module.exports = Query;