import React from 'react';
import styled from 'styled-components';
import { Device } from '../types';
import { Link } from 'react-router-dom';
import brokenImg from '../assets/brokenImg.svg';

interface DeviceGridProps {
  devices: Device[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  overflow-y: auto;
  height: calc(100vh - 130px);
`;

const DeviceWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 0 0 8px 8px;
  padding: 8px;
  transition: background-color 0.3s;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral1};
  border: 1px solid ${({ theme }) => theme.colors.neutral3};
  border-radius: 8px;
  padding: 8px 0 0;
  display: flex;
  flex-direction: column;
  transition: background 0.3s;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral3};
    transition: background 0.3s;

    ${DeviceWrapper} {
      background-color: ${({ theme }) => theme.colors.neutral1};
    }
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 8px;
  align-self: center;
`;

const DeviceLine = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2px 4px;
  border-radius: 4px;
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 0.75rem;
  line-height: 1rem;
`;

const DeviceName = styled.div`
  font-size: 0.875rem;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
`;

const DeviceShortName = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.45);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices }) => {
  return (
    <GridContainer>
      {devices.map((device, index) => (
        <Link to={`/device/${device.sku}`} key={device.id + index}>
          <Card>
            <Image
              src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=200&q=75`}
              alt={device.product.name}
              onError={(e) => (e.currentTarget.src = brokenImg)}
            />
            <DeviceLine>{device?.line?.name}</DeviceLine>
            <DeviceWrapper>
              <DeviceName>{device?.product?.name}</DeviceName>
              <DeviceShortName>{device?.shortnames?.join(', ')}</DeviceShortName>
            </DeviceWrapper>
          </Card>
        </Link>
      ))}
    </GridContainer>
  );
};

export default DeviceGrid;