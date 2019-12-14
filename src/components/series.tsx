import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

type Props = {
  book: Books;
};

const Series: React.FC<Props> = ({ book }) => {
  return (
    <Books>
      <LazyLoad height={200}>
        <ImgBox>
          <Img src={book.image} alt={book.title} />
        </ImgBox>
        <Link to={`/story/${book.id}`}>
          <ButtonSpan>読む</ButtonSpan>
        </Link>
      </LazyLoad>
    </Books>
  );
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Books = styled.div`
  margin: 30px;
`;

const ImgBox = styled.div`
  width: 200px;
`;

const ButtonSpan = styled.span`
  display: block;
  text-align: center;
  padding: 10px;
  margin: 10px;
  background: black;
  border-radius: 25px;
  color: white;
  font-weight: bold;
`;

export default Series;
