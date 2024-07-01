import React from 'react';
import styled from 'styled-components';

const UserInfoContainer = styled.div`
  color: ${({ theme }) => theme.colors.text}; 
  font-size: 0.875rem;
  margin-right: 32px;
`


const UserInfo: React.FC = () => {
  return (
    <UserInfoContainer>
      Author / Uģis Meržvinskis
    </UserInfoContainer>
  );
}

export default UserInfo;