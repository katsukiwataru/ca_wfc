import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Title>
        <Link to={`/`}>MANGA APP</Link>
      </Title>
    </header>
  );
};

const Title = styled.h1`
  padding: 10px 30px;
  margin: 0;
  a {
    color: #000;
  }
`;

export default Header;
