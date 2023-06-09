const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
    _id: ID
     userName: String!
     email: String!
     savedBooks:[Book]
     bookCount: Int   
    }

    type Book {
     bookId: ID!
     authors: [String]
     description: String!
     image: String
     link: String
     title: String!
    }

    type Auth {
     token: ID!
     user: User
    }

    input BookInput {
     bookId: ID!
     authors: [String]
     description: String!
     image: String
     link: String
     title: String!
    }

    type Query {
     me: User
    }

    type Mutation {     
        login(
        email: String!,
        password: String!
        ): Auth     
        addUser(
        username: String!,
             email: String!,
              password: String!
              ): Auth     
        saveBook(
            input: BookInput
            ): User

            removeBook(
                bookId: ID!
                ): User 
    } 

`;

module.exports = typeDefs;