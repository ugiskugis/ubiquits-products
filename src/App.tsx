import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import DeviceList from './components/DeviceList';
import DeviceDetail from './components/DeviceDetail';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  padding: 0 32px;
`;

const App: React.FC = () => {
  const [view, setView] = useState<'table' | 'grid'>('table');

  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<DeviceList view={view} setView={setView} />} />
            <Route path="/device/:deviceId" element={<DeviceDetail view={view} />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;