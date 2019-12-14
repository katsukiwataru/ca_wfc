import React, { useState, useEffect } from 'react';
import API from '../API';
import { match } from 'react-router-dom';
import styled from 'styled-components';
import SeriesComp from '../components/series';

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
          <BookText>
            <BookTitle>{series.title}</BookTitle>
            <Bookdescription>{series.description}</Bookdescription>
          </BookText>
          <Serieses>
            {series.books.map((book, index) => {
              return (
                <React.Fragment key={index}>
                  <SeriesComp book={book} />
                </React.Fragment>
              );
            })}
          </Serieses>
        </div>
      )}
    </div>
  );
};

const BookText = styled.div`
  margin: 10px 30px;
`;

const BookTitle = styled.h2`
  font-size: 30px;
`;

const Bookdescription = styled.p`
  font-size: 18px;
`;

const Serieses = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Series;
