import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  const seriesId = match.params.seriesId;
  const [book, setBook] = useState<Book | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const ScrollRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const splitedBookImageData = useMemo(() => {
    return book ? book.imageData.slice(0, pageNumber + 3) : [];
  }, [book, pageNumber]);

  const prevPageNumber = useCallback(() => {
    if (pageNumber === 0) return;
    setPageNumber((current) => current - 1);
  }, [pageNumber]);

  const nextPageNumber = useCallback(() => {
    if (book == null) return;
    setPageNumber((current) => {
      if (current + 1 === book.pageNum) current;
      return current + 1;
    });
  }, [book]);

  useEffect(() => {
    const getSeries = async () => {
      const { error, res } = await API.getBooks(seriesId);
      if (res) {
        setBook(res);
      }
      if (error) {
        setErrorMessage(error.message);
      }
    };
    getSeries();
  }, [seriesId]);

  return (
    <BookContent>
      {errorMessage && <p>{errorMessage}</p>}
      {book && (
        <>
          <BookInner>
            <BookTitle>{book.title}</BookTitle>
            <PageContent>
              <Pages
                theme={{
                  windowWidth: window.parent.screen.width,
                  imageWidth: ScrollRef.current ? ScrollRef.current.clientWidth : 0,
                  pageNumber: pageNumber,
                }}
              >
                {splitedBookImageData.map((book) => {
                  return (
                    <ImgBox ref={ScrollRef} key={book.imageId}>
                      <LazyLoad>
                        <Img src={book.imageUrl} alt={book.imageId} />
                      </LazyLoad>
                    </ImgBox>
                  );
                })}
              </Pages>
            </PageContent>
            <Buttons>
              <Button onClick={nextPageNumber}>Next</Button>
              <Button onClick={prevPageNumber}>Prev</Button>
            </Buttons>
          </BookInner>
        </>
      )}
    </BookContent>
  );
};

const Pages = styled.div`
  display: flex;
  white-space: nowrap;
  flex-flow: row-reverse;
  transform: translateX(calc(-${(props) => props.theme.windowWidth}px / 2))
    translateX(calc(${(props) => props.theme.imageWidth}px / 2))
    translateX(calc(${(props) => props.theme.imageWidth * props.theme.pageNumber}px));
  white-space: nowrap;
`;

const BookContent = styled.div`
  overflow-x: auto;
  background-color: #333;
  height: 100vh;
`;

const BookInner = styled.div``;

const PageContent = styled.div`
  overflow: hidden;
`;

const BookTitle = styled.h2`
  color: white;
  margin: 0;
`;

const ImgBox = styled.div`
  width: 30%;
  height: 100%;
  flex-shrink: 0;
  position: relative;

  &::before {
    content: '';
    padding-top: calc(100% / 200 * 268);
    display: block;
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  padding: 10px 40px;
  background: #f2f2f2;
  border-radius: 10px;
  margin: 10px;
`;

export default Book;
