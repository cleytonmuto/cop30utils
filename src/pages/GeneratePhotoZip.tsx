import { useState } from 'react';
import JSZip from 'jszip';
import femaleSilhouette from '../assets/female_silhouette.jpg';
import maleSilhouette from '../assets/male_silhouette.jpg';
import womanSilhouette from '../assets/woman_silhouette.jpg';
import manSilhouette from '../assets/man_silhouette.jpg';

const photoOptions = [
    { id: 'female', name: 'Female Silhouette', src: femaleSilhouette, filename: 'female_silhouette.jpg' },
    { id: 'male', name: 'Male Silhouette', src: maleSilhouette, filename: 'male_silhouette.jpg' },
    { id: 'woman', name: 'Woman Silhouette', src: womanSilhouette, filename: 'woman_silhouette.jpg' },
    { id: 'man', name: 'Man Silhouette', src: manSilhouette, filename: 'man_silhouette.jpg' },
];

function GeneratePhotoZip() {
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');
    const [nameList, setNameList] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleGenerate = async () => {
        if (!selectedPhoto || !nameList.trim()) {
            alert('Por favor, selecione uma foto e insira uma lista de nomes.');
            return;
        }

        setIsGenerating(true);

        try {
            const selectedOption = photoOptions.find(opt => opt.id === selectedPhoto);
            if (!selectedOption) {
                throw new Error('Foto selecionada não encontrada');
            }

            // Parse names from input
            const names = nameList
                .split(/\r?\n/)
                .map((name) => name.trim())
                .filter((name) => name.length > 0);

            if (names.length === 0) {
                alert('Por favor, insira pelo menos um nome.');
                setIsGenerating(false);
                return;
            }

            // Fetch the image
            const response = await fetch(selectedOption.src);
            const imageBlob = await response.blob();
            const imageArrayBuffer = await imageBlob.arrayBuffer();

            // Create zip file
            const zip = new JSZip();

            // Add a copy of the image for each name
            for (const name of names) {
                // Sanitize filename - remove special characters and spaces, but keep dots
                const sanitizedName = name.replace(/[^a-zA-Z0-9_.-]/g, '_');
                const extension = selectedOption.filename.split('.').pop() || 'jpg';
                const filename = `${sanitizedName}.${extension}`;
                
                zip.file(filename, imageArrayBuffer);
            }

            // Generate zip file
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            // Download the zip file
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `photos_${Date.now()}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            alert(`Arquivo ZIP criado com sucesso! ${names.length} foto(s) gerada(s).`);
        } catch (error) {
            console.error('Erro ao gerar ZIP:', error);
            alert('Erro ao gerar o arquivo ZIP. Por favor, tente novamente.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClear = () => {
        setSelectedPhoto('');
        setNameList('');
    };

    return (
        <>
            <h1 className="mb-3">Gerar ZIP de Fotos</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Selecione uma foto e insira uma lista de nomes, um por linha. 
                        O sistema criará um arquivo ZIP contendo cópias da foto selecionada, cada uma nomeada com um dos nomes da lista.
                    </small>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        <strong>Selecione uma foto:</strong>
                    </label>
                    <div className="row g-2 mt-2">
                        {photoOptions.map((option) => (
                            <div key={option.id} className="col-md-6 col-lg-3">
                                <div
                                    className={`card border ${
                                        selectedPhoto === option.id
                                            ? 'border-primary border-3'
                                            : 'border-secondary'
                                    }`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedPhoto(option.id)}
                                >
                                    <img
                                        src={option.src}
                                        alt={option.name}
                                        className="card-img-top"
                                        style={{
                                            height: '150px',
                                            objectFit: 'contain',
                                            backgroundColor: '#f8f9fa',
                                            padding: '10px'
                                        }}
                                    />
                                    <div className="card-body p-2 text-center">
                                        <small className="text-muted">{option.name}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        <strong>Lista de Nomes (um por linha):</strong>
                    </label>
                    <textarea
                        className="form-control bg-dark text-light border-secondary"
                        value={nameList}
                        onChange={(e) => setNameList(e.target.value)}
                        rows={10}
                        style={{ width: '100%', resize: 'vertical' }}
                        placeholder="Cole uma lista de nomes, um por linha..."
                    />
                </div>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={!selectedPhoto || !nameList.trim() || isGenerating}
                    >
                        {isGenerating ? 'Gerando ZIP...' : 'Gerar ZIP'}
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={handleClear}
                        disabled={isGenerating}
                    >
                        Limpar
                    </button>
                </div>
            </div>
        </>
    );
}

export default GeneratePhotoZip;

