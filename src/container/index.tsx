import React, { useState, useEffect } from 'react';
import API from '../API';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

type Props = {};

const Home: React.FC<Props> = () => {
  const [series, setSeries] = useState<Serieses[]>([]);
  const getSerieses = async () => {
    try {
      const res = await API.getSerieses();
      setSeries(res.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getSerieses();
  }, []);

  return (
    <div>
      {series.map((serie, index) => {
        return (
          <React.Fragment key={index}>
            <LazyLoad height={200}>
              <Link to={`/series/${serie.seriesId}`}>
                <p>{serie.title}</p>
                <p>{serie.author}</p>
                <Img src={serie.seriesImage} alt={serie.title} />
              </Link>
            </LazyLoad>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export default Home;
