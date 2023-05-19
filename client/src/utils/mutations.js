export { gql } from "@apollo/client";

export const LOGIN_USER = gql`
 mutation login: ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
 }
 `;

 export const ADD_USER = gql`
 mutation login: ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
 }
 `;

 export const SAVE_BOOK = gql`
 mutation login: ($bookData: BookInput!) {
    saveBook(email: $email, password: $password) {
        token
        user{
            _id
            username
            email
        }
    }
 }
 `;

 export const DELETE_BOOK= gql`
 mutation deleteBook: ($bookData: BookInput!) {
    login(email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
 }
 `;