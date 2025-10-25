import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-3 p-2 rounded-3">
                <div className="container-fluid gap-2">
                    <Link className="navbar-brand" to="/">
                        COP30 Utils
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navContent"
                        aria-controls="navContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navContent">
                        <div className="navbar-nav ms-auto gap-2">
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
                            <Link className="nav-link" to="/normalize-name">
                                Normalizar Nome
                            </Link>
                            <Link className="nav-link" to="/gender-detection">
                                Detectar Gênero
                            </Link>
                            <Link className="nav-link" to="/split-names">
                                Separar Nomes
                            </Link>
                            <Link className="nav-link" to="/detect-repeats">
                                Detectar Repetições
                            </Link>
                            <Link className="nav-link" to="/format-phone">
                                Formatar Telefone
                            </Link>
                        </div>
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
