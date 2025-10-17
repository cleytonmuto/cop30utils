import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Link to="/">Home</Link>
                <Link to="/to-upper">To Upper</Link>
                <Link to="/to-lower">To Lower</Link>
            </nav>
            <Outlet />
        </>
    );
}

export default App;
