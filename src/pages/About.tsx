import team1 from '../assets/team1.png';
import team2 from '../assets/team2.png';

function About() {
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="card bg-dark text-light border-secondary mb-4">
                            <div className="card-body p-4">
                                <h1 className="text-center mb-4 text-primary">Sobre o COP30 Utils</h1>
                                <p className="lead text-center mb-4">
                                    Uma coleção de ferramentas úteis para processamento de dados e validação.
                                </p>
                                
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h3 className="text-center mb-3 text-secondary">Nossa Equipe</h3>
                                    </div>
                                </div>

                                <div className="row g-4 mb-4">
                                    <div className="col-12 col-md-6">
                                        <div className="card bg-secondary border-primary h-100">
                                            <div className="card-body text-center p-3">
                                                <img 
                                                    src={team2} 
                                                    alt="Equipe 1" 
                                                    className="img-fluid rounded mb-3"
                                                    style={{ 
                                                        maxHeight: '300px', 
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        border: '2px solid #0d6efd'
                                                    }}
                                                />
                                                <h5 className="card-title text-light">Equipe de Desenvolvimento</h5>
                                                <p className="card-text text-light-50">
                                                    Gerentes de credenciamento da força de trabalho da COP30
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 col-md-6">
                                        <div className="card bg-secondary border-primary h-100">
                                            <div className="card-body text-center p-3">
                                                <img 
                                                    src={team1} 
                                                    alt="Equipe 2" 
                                                    className="img-fluid rounded mb-3"
                                                    style={{ 
                                                        maxHeight: '300px', 
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        border: '2px solid #0d6efd'
                                                    }}
                                                />
                                                <h5 className="card-title text-light">Equipe de Qualidade</h5>
                                                <p className="card-text text-light-50">
                                                    Responsáveis pela validação e coordenação da equipe
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                                <div className="row mt-4">
                                    <div className="col-12">
                                        <div className="text-center">
                                            <h5 className="text-primary mb-3">Desenvolvido com ❤️</h5>
                                            <p className="text-light-50">
                                                COP30 Utils - Ferramentas práticas para o seu dia a dia
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
