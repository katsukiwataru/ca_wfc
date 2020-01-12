import React, { useState, useEffect } from 'react';
import API from '../API';
import styled from 'styled-components';
import HomeComp from '../components/index';

type Props = {};

const Home: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serieses, setSerieses] = useState<Serieses[]>([]);
  useEffect(() => {
    const getSerieses = async () => {
      try {
        const res = await API.getSerieses();
        setSerieses(res.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getSerieses();
  }, []);

  return (
    <Serieses>
      {errorMessage && <p>{errorMessage}</p>}
      {serieses.map((series) => {
        return <HomeComp series={series} key={series.seriesId} />;
      })}
    </Serieses>
  );
};

const Serieses = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Home;
