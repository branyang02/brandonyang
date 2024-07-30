import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DarkModeProvider } from './context/DarkModeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DarkModeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DarkModeProvider>
    </React.StrictMode>,
);
