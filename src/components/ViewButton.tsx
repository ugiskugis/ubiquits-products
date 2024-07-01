import React from 'react';
import styled from 'styled-components';

interface ViewButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const ViewButtonContainer = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  width: 32px;
  height: 32px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral1};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: transparent;

     svg {
        path{
            fill: ${({ theme }) => theme.colors.neutral8};
        }
      }
  }

  &.active {
      background-color: ${({ theme }) => theme.colors.secondary};
      
      svg {
        path{
            fill: ${({ theme }) => theme.colors.primary};
        }
      }
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const ViewButton: React.FC<ViewButtonProps> = ({ isActive, onClick, icon }) => {
  return (
    <ViewButtonContainer onClick={onClick} className={isActive ? 'active' : ''}>
      {icon}
    </ViewButtonContainer>
  );
};

export default ViewButton;