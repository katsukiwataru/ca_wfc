import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

type Props = {
  series: Serieses;
};

const Home: React.FC<Props> = ({ series }) => {
  return (
    <Series>
      <Link to={`/series/${series.seriesId}`}>
        <Title>{series.title}</Title>
      </Link>
      <ImgBox>
        <LazyLoad>
          <Img src={series.seriesImage} alt={series.title} />
        </LazyLoad>
        <Author>作者：{series.author}</Author>
      </ImgBox>
    </Series>
  );
};

const Series = styled.div`
  margin: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: black;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgBox = styled.div`
  width: 200px;
`;

const Author = styled.p`
  font-size: 20px;
`;

export default Home;
