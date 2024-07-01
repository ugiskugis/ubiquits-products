import React from 'react';
import ViewButton from './ViewButton';
import styled from 'styled-components';
import { ReactComponent as ListView } from '../assets/list-view.svg';
import { ReactComponent as GridView } from '../assets/grid-view.svg';

const ViewToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  gap: 4px;
`;

interface ViewToggleProps {
  view: 'table' | 'grid';
  setView: (view: 'table' | 'grid') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <ViewToggleContainer>
      <ViewButton
        isActive={view === 'table'}
        onClick={() => setView('table')}
        icon={<ListView />}
      />
      <ViewButton
        isActive={view === 'grid'}
        onClick={() => setView('grid')}
        icon={<GridView />}
      />
    </ViewToggleContainer>
  );
};

export default ViewToggle;