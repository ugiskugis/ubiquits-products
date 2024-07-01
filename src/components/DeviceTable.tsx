import React from 'react';
import styled from 'styled-components';
import { Device } from '../types';
import { useNavigate } from 'react-router-dom';
import brokenImg from '../assets/brokenImg.svg';

interface DeviceTableProps {
  devices: Device[];
}

const Container = styled.div`
  height: calc(100vh - 122px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollableTableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral3};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const Tbody = styled.tbody`
  color: rgba(0, 0, 0, 0.65);
  font-size: 0.875rem;
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral3};
    transition: background-color 0.3s;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Td = styled.td`
  padding: 6px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral3};
`;

const TdProductLine = styled(Td)`
  width: 50%;
  color: rgba(0, 0, 0, 0.65);
`;

const TdProductName = styled(Td)`
  width: 50%;
  color: rgba(0, 0, 0, 0.45);
`;

const Image = styled.img`
  width: 20px;
  height: auto;
`;

const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => {
  const navigate = useNavigate();

  const handleRowClick = (sku: string) => {
    navigate(`/device/${sku}`);
  };

  return (
    <Container>
      <ScrollableTableContainer>
        <Table>
          <thead>
            <tr>
              <Th></Th>
              <Th>Product Line</Th>
              <Th>Name</Th>
            </tr>
          </thead>
          <Tbody>
            {devices.map(device => (
              <Tr key={device.id} onClick={() => handleRowClick(device.sku)}>
                <Td>
                  <Image
                    src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=20&q=75`}
                    alt={device.product.name}
                    onError={(e) => (e.currentTarget.src = brokenImg)}
                  />
                </Td>
                <TdProductLine>{device?.line?.name}</TdProductLine>
                <TdProductName>{device?.product?.name}</TdProductName>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ScrollableTableContainer>
    </Container>
  );
};

export default DeviceTable;