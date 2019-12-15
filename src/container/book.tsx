import React, { useState, useEffect, useRef } from 'react';
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
  const [pageNumber, setPageNumber] = useState<number>(0);
  const ScrollRef = useRef<HTMLDivElement>(null);
  const splitedBookImageData = fetched ? book.imageData.slice(0, pageNumber + 3) : [];

  const getSeries = async () => {
    try {
      const res = await API.getBooks(seriesId);
      setBook(res);
      setFetched(true);
    } catch (error) {
      return;
    }
  };

  const prevPageNumber = () => {
    const currentPage = pageNumber - 1;
    if (!currentPage) return;
    setPageNumber(currentPage);
  };

  const nextPageNumber = () => {
    const currentPage = pageNumber + 1;
    setPageNumber(currentPage);
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <BookContent>
      {fetched && (
        <>
          <BookInner>
            <BookTitle>{book.title}</BookTitle>
            <button onClick={nextPageNumber}>Next</button>
            <button onClick={prevPageNumber}>Prev</button>
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
                    <React.Fragment key={book.imageId}>
                      <ImgBox ref={ScrollRef}>
                        <LazyLoad>
                          <Img src={book.imageUrl} alt={book.imageId} />
                        </LazyLoad>
                      </ImgBox>
                    </React.Fragment>
                  );
                })}
              </Pages>
            </PageContent>
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

export default Book;
