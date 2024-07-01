import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import ViewToggle from './ViewToggle';

interface TopBarProps {
  view: 'table' | 'grid';
  setView: (view: 'table' | 'grid') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  deviceCount: number;
  setFilters: (filters: string[]) => void;
}

const TopBarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
`;

const TopBar: React.FC<TopBarProps> = ({ view, setView, searchTerm, setSearchTerm, deviceCount, setFilters }) => {
  return (
    <TopBarContainer>
      <TopBarLeft>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} deviceCount={deviceCount} />
      </TopBarLeft>
      <TopBarRight>
        <ViewToggle view={view} setView={setView} />
        <FilterOptions onFilterChange={setFilters} />
      </TopBarRight>
    </TopBarContainer>
  );
}

export default TopBar;