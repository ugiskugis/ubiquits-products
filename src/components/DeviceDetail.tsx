import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDevices } from '../hooks/useDevices';
import brokenImg from '../assets/brokenImg.svg';
import arrow from '../assets/arrow.svg';
import arrowNext from '../assets/arrow-next.svg';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
`;

const BackButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  color: rgba(0, 0, 0, 0.45);

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral3};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ArrowContainer = styled.div`
  display: flex;
`;

const DeviceDetailContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 16px auto;
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
`;

const DeviceInfoLine = styled.p`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 16px;
  margin-top: 0;
`;

const DeviceImage = styled.img`
  padding: 16px;
  height: auto;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral1};
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 32px;
`;

const DeviceInfoTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
  margin-bottom: 4px;
  margin-top: 0;
  color: rgba(0, 0, 0, 0.85);
`;

const DeviceInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.85);

  span {
    width: 50%;
  }
`;

const DeviceText = styled.span`
  text-align: right;
  width: 50%;
  color: rgba(0, 0, 0, 0.45);
`;

const JsonLink = styled.a`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  height: 32px;
  padding: 4px;
  transition: color 0.3s;
  cursor: pointer;
  border-radius: 4px;
  width: fit-content;
  line-height: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  &:hover {
    transition: color 0.3s;
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavigationButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 0 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral3};
  }
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

interface DeviceDetailProps {
  view: 'table' | 'grid';
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({ view }) => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { data: devices, isLoading, error } = useDevices();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const deviceIndex = devices?.findIndex(d => d.sku === deviceId);
  const device = deviceIndex !== undefined && deviceIndex !== -1 ? devices?.[deviceIndex] : undefined;

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (devices && deviceIndex !== undefined && deviceIndex !== -1) {
      const newIndex = direction === 'prev' ? deviceIndex - 1 : deviceIndex + 1;
      if (newIndex >= 0 && newIndex < devices.length) {
        navigate(`/device/${devices[newIndex].sku}`, { state: { from } });
      }
    }
  };

  const downloadJSON = () => {
    if (device) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(device, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${device.product.name}.json`);
      document.body.appendChild(downloadAnchorNode); // Required for Firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  if (isLoading) return <MessageContainer>Loading...</MessageContainer>;
  if (error) return <MessageContainer>Error loading device</MessageContainer>;
  if (!device) return <MessageContainer>No device found</MessageContainer>;

  return (
    <Container>
      <ButtonContainer>
        <BackButton onClick={() => navigate(from)}><img src={arrow} alt="back button"/> Back</BackButton>
        <ArrowContainer>
          <NavigationButton onClick={() => handleNavigation('prev')}><img src={arrow} alt="prev"/></NavigationButton>
          <NavigationButton onClick={() => handleNavigation('next')}><img src={arrowNext} alt="next"/></NavigationButton>
        </ArrowContainer>
      </ButtonContainer>
      <DeviceDetailContainer>
        <DeviceImage
          src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=256&q=75`}
          alt={device.product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = brokenImg;
          }}
        />
        <DeviceInfo>
          <DeviceInfoTitle>{device.product.name}</DeviceInfoTitle>
          <DeviceInfoLine>{device.line.name}</DeviceInfoLine>
          <DeviceInfoItem><span>Product Line:</span> <DeviceText>{device.line.name}</DeviceText></DeviceInfoItem>
          <DeviceInfoItem><span>ID: </span><DeviceText>{device.sku}</DeviceText></DeviceInfoItem>
          <DeviceInfoItem><span>Name:</span> <DeviceText>{device.product.name}</DeviceText></DeviceInfoItem>
          <DeviceInfoItem><span>Short Name:</span> <DeviceText>{device.shortnames?.join(', ')}</DeviceText></DeviceInfoItem>
          <JsonLink onClick={downloadJSON}>See All Details as JSON</JsonLink>
        </DeviceInfo>
      </DeviceDetailContainer>
    </Container>
  );
};

export default DeviceDetail;