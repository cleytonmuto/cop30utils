import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <nav className="navbar navbar-expand bg-dark navbar-dark mb-3 p-2 rounded-3">
                <div className="container-fluid gap-2">
                    <Link className="navbar-brand" to="/">
                        COP30 Utils
                    </Link>
                    <div className="navbar-nav flex-row gap-2">
                        <Link className="nav-link" to="/to-upper">
                            TO UPPER
                        </Link>
                        <Link className="nav-link" to="/to-lower">
                            to lower
                        </Link>
                        <Link className="nav-link" to="/clean-numbers">
                            Limpar CPF
                        </Link>
                        <Link className="nav-link" to="/validate-cpf">
                            Validar CPF
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="container text-light">
                <Outlet />
            </div>
        </>
    );
}

export default App;
