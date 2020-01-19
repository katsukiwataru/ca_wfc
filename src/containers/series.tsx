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
  const seriesId = match.params.seriesId;
  const [series, setSeries] = useState<Series | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getSeries = async () => {
      const { error, res } = await API.getSeries(seriesId);
      if (res) {
        setSeries(res);
      }
      if (error) {
        setErrorMessage(error.message);
      }
    };
    getSeries();
  }, [seriesId]);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {series && (
        <div>
          <BookText>
            <BookTitle>{series.title}</BookTitle>
            <Bookdescription>{series.description}</Bookdescription>
          </BookText>
          <Serieses>
            {series.books.map((book) => {
              return (
                <React.Fragment key={book.id}>
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
