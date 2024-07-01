import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDevices } from '../hooks/useDevices';
import checkIcon from '../assets/union.svg';

const FilterContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterButton = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral2};
    transition: all 0.2s;
  }

  &:focus {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    transition: all 0.2s;
  }
`;

const FilterDropdown = styled.div`
  display: block;
  position: absolute;
  right: -30px;
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 16px;
`;

const FilterText = styled.p`
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  font-size: 0.875rem;
  user-select: none;
  color: ${({ theme }) => theme.colors.text2};

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      background-color: ${({ theme }) => theme.colors.primary};
      border: 1px solid ${({ theme }) => theme.colors.primary};
      transition: all 0.2s;
    }

    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
    transition: all 0.2s;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: url(${checkIcon}) no-repeat center center;
    background-size: contain;
  }
`;

const ResetButton = styled.button`
  margin-top: 8px;
  padding: 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const FilterOptions: React.FC<{ onFilterChange: (filters: string[]) => void }> = ({ onFilterChange }) => {
  const { data: devices = [] } = useDevices();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const deviceLines = Array.from(new Set(devices.map(device => device.line.name)));

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedFilters(prevFilters =>
      checked ? [...prevFilters, value] : prevFilters.filter(filter => filter !== value)
    );
  };

  const handleReset = () => {
    setSelectedFilters([]);
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <FilterContainer ref={filterContainerRef}>
      <FilterButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Filter</FilterButton>
      {isDropdownOpen && (
      <FilterDropdown>
        <FilterText>Product line</FilterText>
        {deviceLines.map(line => (
          <CheckboxLabel key={line}>
            <input
              type="checkbox"
              value={line}
              checked={selectedFilters.includes(line)}
              onChange={handleCheckboxChange}
            />
            {line}
            <span className="checkmark"></span>
          </CheckboxLabel>
        ))}
        <ResetButton disabled={selectedFilters.length === 0} onClick={handleReset}>Reset</ResetButton>
      </FilterDropdown>
      )}
    </FilterContainer>
  );
};

export default FilterOptions;