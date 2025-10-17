import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="card p-3 bg-dark text-light border-secondary">
            <h1 className="mb-3">COP30 Utils</h1>
            <p>Choose a tool:</p>
            <ul
                style={{
                    display: 'grid',
                    gap: 8,
                    paddingLeft: 18,
                    textAlign: 'left',
                }}
            >
                <li>
                    <Link to="/to-upper">lowercase → UPPERCASE</Link>
                </li>
                <li>
                    <Link to="/to-lower">UPPERCASE → lowercase</Link>
                </li>
                <li>
                    <Link to="/clean-numbers">Limpar CPF</Link>
                </li>
            </ul>
        </div>
    );
}

export default Home;
