import React, { useState } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

import Auth from '../utils/auth';

// const SavedBooks = () => {
//   const [savedBooks, setSavedBooks] = useState([]);
//   const { loading, data } = useQuery(QUERY_ME);


//   const userData = data?.me || {};

// const handleDeleteBook = async (bookId) => {
//   const token = Auth.loggedIn()? Auth.getToken():null;



const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  const { loading, data: userData, error } = useQuery(QUERY_ME, {
    onCompleted: (data) => {
      setSavedBooks(data?.me?.savedBooks || []);
    },
  });

  const [removeBook, { error: removeBookError }] = useMutation(REMOVE_BOOK);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Error occurred. Please try again later.</h2>;
  }

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId }
      });

      removeBookId(bookId);
    

    setSavedBooks((prevSavedBooks) =>
        prevSavedBooks.filter((book) => book.bookId !== bookId))
  
      }catch (err){
    console.error(err);
  }
};
  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? 
                  <Card.Img 
                  src={book.image}
                  alt={`The cover for ${book.title}`} 
                  variant='top'
                   /> 
                   : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
