import React, { useState } from 'react';
import DeviceTable from './DeviceTable';
import DeviceGrid from './DeviceGrid';
import TopBar from './TopBar';
import styled from 'styled-components';
import { useDevices } from '../hooks/useDevices';

const DeviceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
`;

interface DeviceListProps {
  view: 'table' | 'grid';
  setView: (view: 'table' | 'grid') => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ view, setView }) => {
  const { data: devices = [], isLoading, error } = useDevices();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<string[]>([]);

  if (isLoading) return <MessageContainer>Loading...</MessageContainer>;
  if (error) return <MessageContainer>Error loading devices</MessageContainer>;

  const filteredDevices = devices.filter(device =>
    device.product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.length === 0 || filters.includes(device.line.name))
  );

  return (
    <DeviceListContainer>
      <TopBar
        view={view}
        setView={setView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        deviceCount={filteredDevices.length}
        setFilters={setFilters}
      />
      {view === 'table' ? <DeviceTable devices={filteredDevices} /> : <DeviceGrid devices={filteredDevices} />}
    </DeviceListContainer>
  );
};

export default DeviceList;