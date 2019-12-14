import React, { useState, useEffect } from 'react';
import API from '../API';
import { match, Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

type Props = {
  match: match<{
    seriesId: string;
  }>;
};

const Series: React.FC<Props> = ({ match }) => {
  const seriesId = match.params.seriesId || '';
  const [series, setSeries] = useState<Series>(Object);
  const [fetched, setFetched] = useState<boolean>(false);

  const getSeries = async () => {
    try {
      const res = await API.getSeries(seriesId);
      setSeries(res);
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
        <div>
          <p>{series.title}</p>
          <div>
            {series.books.map((book, index) => {
              return (
                <React.Fragment key={index}>
                  <LazyLoad height={200}>
                    <div>
                      <Img src={book.image} alt={book.title} />
                      <Link to={`/story/${book.id}`}>読む</Link>
                    </div>
                  </LazyLoad>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Img = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

// const Books = styled.div`
//   display: flex;
// `;

// const Book = styled.div`
//   /* display: flex; */
//   /* justify-content: center;
//   align-items: center; */
// `;

export default Series;
