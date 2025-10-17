import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Home from './pages/Home';
import ToUpper from './pages/ToUpper';
import ToLower from './pages/ToLower';
import CleanNumbers from './pages/CleanNumbers';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'to-upper', element: <ToUpper /> },
            { path: 'to-lower', element: <ToLower /> },
            { path: 'clean-numbers', element: <CleanNumbers /> },
        ],
    },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
