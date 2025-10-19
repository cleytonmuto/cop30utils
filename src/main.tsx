import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import Home from './pages/Home';
import ToUpper from './pages/ToUpper';
import ToLower from './pages/ToLower';
import CleanNumbers from './pages/CleanNumbers';
import ValidateCpf from './pages/ValidateCpf';
import NormalizeName from './pages/NormalizeName';
import GenderDetection from './pages/GenderDetection';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'to-upper', element: <ToUpper /> },
            { path: 'to-lower', element: <ToLower /> },
            { path: 'clean-numbers', element: <CleanNumbers /> },
            { path: 'validate-cpf', element: <ValidateCpf /> },
            { path: 'normalize-name', element: <NormalizeName /> },
            { path: 'gender-detection', element: <GenderDetection /> },
        ],
    },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
