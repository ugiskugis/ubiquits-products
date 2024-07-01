import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDevices } from '../hooks/useDevices';
import searchIcon from '../assets/search-icon.svg';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  deviceCount: number;
}

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0 0 0 32px;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutral2};
  color: ${({ theme }) => theme.colors.textDark};
  border-radius: 4px;
  width: 344px;
  height: 32px;
  transition: all 0.3s;
  font-size: 0.875rem;
  border: 1px solid transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral3};
    transition: all 0.3s;
  }

  &:focus, &:active {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    outline: none;
    transition: all 0.3s;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 8px;
`;

const DeviceCount = styled.span`
  margin-left: 10px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.neutral4};
`;

const SearchResults = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% - 2px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 16px 32px rgba(28, 30, 45, 0.2);
  z-index: 1000;
  max-height: 112px;
  overflow-y: auto;
  padding: 8px 0;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text2};
  line-height: 1.25rem;
  min-height: 32px;
  align-items: center;
  padding: 0 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  font-size: 0.875rem;  

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral3};
    transition: all 0.3s;
  }

  &:focus, &:active {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    outline: none;
    transition: all 0.3s;
  }
`;

const ResultsProductName = styled.span`
  padding-right: 8px;
`;

const ResultsProductShortName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, deviceCount }) => {
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsResultsVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setIsResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: devices = [] } = useDevices();

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : (
        part
      )
    );
  };

  const searchResults = searchTerm
    ? devices.filter(device =>
        device.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

    return (
    <>
      <SearchBarContainer ref={searchBarRef}>
        <SearchInputWrapper>
          <SearchIcon src={searchIcon} alt="Search Icon" />
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsResultsVisible(true)}
          />
        </SearchInputWrapper>
        {isResultsVisible && searchResults.length > 0 && (
          <SearchResults>
            {searchResults.map((result, index) => (
            <Link to={`/device/${result.sku}`}>
              <ResultItem key={result.id + index}>
                <ResultsProductName>{getHighlightedText(result.product.name, searchTerm)}</ResultsProductName>
                <ResultsProductShortName>{result.shortnames?.[0]}</ResultsProductShortName>
              </ResultItem>
            </Link>
            ))}
          </SearchResults>
        )}
      </SearchBarContainer>
      <DeviceCount>{deviceCount} Devices</DeviceCount>
    </>
  );
};

export default SearchBar;