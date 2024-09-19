// Dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HMSRoomProvider>
      <Router>
        <App />
      </Router>
    </HMSRoomProvider>
  </StrictMode>,
)
