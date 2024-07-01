import React from 'react';
import Logo from './Logo';
import UserInfo from './UserInfo';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo />
      <UserInfo />
    </HeaderContainer>
  );
}

export default Header;