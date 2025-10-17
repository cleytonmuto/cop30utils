import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="card">
            <h1>COP30 Utils</h1>
            <p>Choose a tool:</p>
            <ul style={{ display: 'grid', gap: 8, paddingLeft: 18 }}>
                <li>
                    <Link to="/to-upper">Lowercase → UPPERCASE</Link>
                </li>
                <li>
                    <Link to="/to-lower">UPPERCASE → lowercase</Link>
                </li>
            </ul>
        </div>
    );
}

export default Home;
