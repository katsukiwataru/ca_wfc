import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <>
      <header>
        <Title>MANGA APP</Title>
      </header>
    </>
  );
};

const Title = styled.h1`
  padding: 10px 30px;
  margin: 0;
`;

export default Header;
