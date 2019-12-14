import React, { useState, useEffect } from 'react';
import API from '../API';
import { match } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

type Props = {
  match: match<{
    seriesId: string;
  }>;
};

const Book: React.FC<Props> = ({ match }) => {
  const seriesId = match.params.seriesId || '';
  const [book, setBook] = useState<Book>(Object);
  const [fetched, setFetched] = useState<boolean>(false);

  const getSeries = async () => {
    try {
      const res = await API.getBooks(seriesId);
      setBook(res);
      setFetched(true);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div>
      {fetched && (
        <>
          <p>{book.title}</p>
          {book.imageData.map((book) => {
            return (
              <React.Fragment key={book.imageId}>
                <LazyLoad height={200}>
                  <div>
                    <Img src={book.imageUrl} alt={book.imageId} />
                  </div>
                </LazyLoad>
              </React.Fragment>
            );
          })}
        </>
      )}
    </div>
  );
};

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export default Book;
