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
      <ImgBox>
        <LazyLoad>
          <Img src={book.image} alt={book.title} />
        </LazyLoad>
      </ImgBox>
      <Link to={`/story/${book.id}`}>
        <ButtonSpan>読む</ButtonSpan>
      </Link>
    </Books>
  );
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const Books = styled.div`
  margin: 30px;
`;

const ImgBox = styled.div`
  width: 200px;
  position: relative;

  &::before {
    content: '';
    padding-top: calc(100% / 200 * 268);
    display: block;
  }
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
  width: 190px;
`;

export default Series;
