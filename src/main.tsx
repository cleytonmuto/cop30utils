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
import SplitNames from './pages/SplitNames';
import DetectRepeats from './pages/DetectRepeats';
import FormatPhone from './pages/FormatPhone';
import ValidateEmail from './pages/ValidateEmail';
import CompareLists from './pages/CompareLists';
import RemoveDuplicates from './pages/RemoveDuplicates';
import SortNames from './pages/SortNames';
import SortNamesDesc from './pages/SortNamesDesc';
import SortByLength from './pages/SortByLength';
import FindDuplicateRows from './pages/FindDuplicateRows';
import GeneratePhotoZip from './pages/GeneratePhotoZip';
import About from './pages/About';

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
            { path: 'split-names', element: <SplitNames /> },
            { path: 'detect-repeats', element: <DetectRepeats /> },
            { path: 'format-phone', element: <FormatPhone /> },
            { path: 'validate-email', element: <ValidateEmail /> },
            { path: 'compare-lists', element: <CompareLists /> },
            { path: 'remove-duplicates', element: <RemoveDuplicates /> },
            { path: 'sort-names', element: <SortNames /> },
            { path: 'sort-names-desc', element: <SortNamesDesc /> },
            { path: 'sort-by-length', element: <SortByLength /> },
            { path: 'find-duplicate-rows', element: <FindDuplicateRows /> },
            { path: 'generate-photo-zip', element: <GeneratePhotoZip /> },
            { path: 'about', element: <About /> },
        ],
    },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
