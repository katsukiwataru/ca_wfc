import React, { useState, useEffect } from 'react';
import API from '../API';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

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
          <Series key={index}>
            <LazyLoad height={300}>
              <Link to={`/series/${series.seriesId}`}>
                <Title>{series.title}</Title>
              </Link>
              {/* <ServiceBox> */}
              <ImgBox>
                <Img src={series.seriesImage} alt={series.title} />
                <Author>{series.author}</Author>
              </ImgBox>
              {/* <Text><Description>{series.description}</Description></Text> */}
              {/* </ServiceBox> */}
            </LazyLoad>
          </Series>
        );
      })}
    </Serieses>
  );
};

const Serieses = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  position: absolute;
  left: 20%;
`;

const Series = styled.div`
  margin: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgBox = styled.div`
  width: 200px;
`;

// const ServiceBox = styled.div`
//   display: flex;
// `;

// const Text = styled.div`
//   width: 80%;
//   margin: 30px;
// `;

// const Description = styled.p``;

const Author = styled.p`
  font-size: 20px;
`;

export default Home;
