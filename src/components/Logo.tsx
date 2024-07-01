import React from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { ReactComponent as LogoSvg } from '../assets/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const LogoText = styled.p`
  margin-left: 16px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s;
`;

const StyledLogo = styled(LogoSvg)`
  cursor: pointer;

  path {
    transition: fill 0.3s;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover ${LogoText} {
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s;
  }

  &:hover ${StyledLogo} path {
    fill: ${({ theme }) => theme.colors.primary};
    transition: fill 0.3s;
  }
`;

const Logo: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    queryClient.refetchQueries({ queryKey: ['devices'] });
    navigate(location.state?.from || '/');
  };

  return (
    <LogoContainer tabIndex={0} onClick={handleLogoClick}>
      <StyledLogo />
      <LogoText>Devices</LogoText>
    </LogoContainer>
  );
};

export default Logo;