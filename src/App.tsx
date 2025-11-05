import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <nav className="navbar navbar-expand-xl bg-dark navbar-dark mb-3 p-2 rounded-3">
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
                        <div className="navbar-nav ms-auto gap-1" style={{ fontSize: '0.9rem' }}>
                            <Link className="nav-link" to="/to-upper">
                                UPPER
                            </Link>
                            <Link className="nav-link" to="/to-lower">
                                lower
                            </Link>
                            <Link className="nav-link" to="/clean-numbers">
                                CPF
                            </Link>
                            <Link className="nav-link" to="/validate-cpf">
                                Valid CPF
                            </Link>
                            <Link className="nav-link" to="/normalize-name">
                                Nome
                            </Link>
                            <Link className="nav-link" to="/gender-detection">
                                Gênero
                            </Link>
                            <Link className="nav-link" to="/split-names">
                                Split
                            </Link>
                            <Link className="nav-link" to="/detect-repeats">
                                Repetidos
                            </Link>
                            <Link className="nav-link" to="/format-phone">
                                Fone
                            </Link>
                            <Link className="nav-link" to="/validate-email">
                                Email
                            </Link>
                            <Link className="nav-link" to="/compare-lists">
                                Comparar
                            </Link>
                            <Link className="nav-link" to="/remove-duplicates">
                                Duplicatas
                            </Link>
                            <Link className="nav-link" to="/find-duplicate-rows">
                                Dup Excel
                            </Link>
                            <Link className="nav-link" to="/sort-names">
                                Ord ↑
                            </Link>
                            <Link className="nav-link" to="/sort-names-desc">
                                Ord ↓
                            </Link>
                            <Link className="nav-link" to="/generate-photo-zip">
                                Foto ZIP
                            </Link>
                            <Link className="nav-link" to="/about">
                                Sobre
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
