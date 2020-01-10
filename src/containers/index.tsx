import React, { useState, useEffect } from 'react';
import API from '../API';
import styled from 'styled-components';
import HomeComp from '../components/index';

type Props = {};

const Home: React.FC<Props> = () => {
  const [serieses, setSerieses] = useState<Serieses[]>([]);
  const getSerieses = async () => {
    try {
      const res = await API.getSerieses();
      setSerieses(res.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getSerieses();
  }, []);

  return (
    <Serieses>
      {serieses.map((series, index) => {
        return (
          <React.Fragment key={index}>
            <HomeComp series={series} />
          </React.Fragment>
        );
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
