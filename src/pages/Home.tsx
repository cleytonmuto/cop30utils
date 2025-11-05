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
                <li>
                    <Link to="/validate-cpf">Validar CPF</Link>
                </li>
                <li>
                    <Link to="/normalize-name">Normalizar Nome</Link>
                </li>
                <li>
                    <Link to="/gender-detection">Detectar Gênero</Link>
                </li>
                <li>
                    <Link to="/split-names">Separar Nomes</Link>
                </li>
                <li>
                    <Link to="/detect-repeats">Detectar Repetições</Link>
                </li>
                <li>
                    <Link to="/format-phone">Formatar Telefone</Link>
                </li>
                <li>
                    <Link to="/validate-email">Validar E-mail</Link>
                </li>
                <li>
                    <Link to="/compare-lists">Comparar Listas</Link>
                </li>
                <li>
                    <Link to="/remove-duplicates">Remover Duplicatas</Link>
                </li>
                <li>
                    <Link to="/sort-names">Ordenar Nomes</Link>
                </li>
                <li>
                    <Link to="/sort-names-desc">Ordenar Nomes (Decrescente)</Link>
                </li>
                <li>
                    <Link to="/generate-photo-zip">Gerar ZIP de Fotos</Link>
                </li>
                <li>
                    <Link to="/about">Sobre</Link>
                </li>
            </ul>
        </div>
    );
}

export default Home;
