const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
     _id: ID
     userName: String!
     email: String!
     password: String!
     books:[Book]   
    }

    type Book {
     _id: ID!
     author: [String]
     description: String!
     image: String
     link: String
     title: String!
    }

    type Query {
        books: [Book]!
        book(bookId: ID!): Book
    
    }

    type Mutation {
    createUser
    deleteBook
    
    }
`;

module.exports = typeDefs;