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
      <Title>{series.title}</Title>
      <ImgBox>
        <LazyLoad>
          <Img src={series.seriesImage} alt={series.title} />
        </LazyLoad>
        <Author>作者：{series.author}</Author>
      </ImgBox>
      <Link to={`/series/${series.seriesId}`}>
        <ButtonSpan>読む</ButtonSpan>
      </Link>
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

const ButtonSpan = styled.span`
  display: block;
  text-align: center;
  padding: 10px;
  margin: 10px auto;
  background: black;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  width: 190px;
`;

const ImgBox = styled.div`
  width: 200px;
  margin: 0 auto;
`;

const Author = styled.p`
  font-size: 20px;
`;

export default Home;
