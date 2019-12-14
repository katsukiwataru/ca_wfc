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
        <>
          <p>{series.title}</p>
          {series.books.map((book, index) => {
            return (
              <React.Fragment key={index}>
                <div>
                  <Link to={`/story/${book.id}`}>読む</Link>
                  <LazyLoad>
                    <Img src={book.image} alt={book.title} />
                  </LazyLoad>
                </div>
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

export default Series;
