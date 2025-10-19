import { useState } from 'react';

interface GenderizeResponse {
    name: string;
    gender: 'male' | 'female' | null;
    probability: number;
    count: number;
}

async function detectGenderFromAPI(name: string): Promise<{ salutation: string; probability: number | null }> {
    try {
        // Extract first name for better accuracy
        const firstName = name.trim().split(' ')[0];
        
        const response = await fetch(`https://api.genderize.io?name=${encodeURIComponent(firstName)}`);
        
        if (!response.ok) {
            return { salutation: 'Unknown', probability: null };
        }
        
        const data: GenderizeResponse = await response.json();
        
        if (data.gender === 'male') {
            return { salutation: 'Mr.', probability: data.probability };
        } else if (data.gender === 'female') {
            return { salutation: 'Ms.', probability: data.probability };
        } else {
            return { salutation: 'Unknown', probability: null };
        }
    } catch (error) {
        console.error('Error detecting gender:', error);
        return { salutation: 'Unknown', probability: null };
    }
}

async function processNamesList(inputText: string, showProbability: boolean): Promise<string> {
    const lines = inputText.split(/\r?\n/);
    const results: string[] = [];
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            results.push('');
            continue;
        }
        
        const { salutation, probability } = await detectGenderFromAPI(trimmedLine);
        
        if (salutation === 'Unknown') {
            results.push(`${trimmedLine} - Unknown gender`);
        } else {
            if (showProbability && probability !== null) {
                const percentageConfidence = (probability * 100).toFixed(0);
                results.push(`${salutation} (${percentageConfidence}% confidence)`);
            } else {
                results.push(`${salutation}`);
            }
        }
        
        // Small delay to avoid rate limiting (100ms between requests)
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results.join('\n');
}

function GenderDetection() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showProbability, setShowProbability] = useState<boolean>(false);

    const handleDetectGender = async () => {
        if (!inputText.trim()) return;
        
        setLoading(true);
        setOutputText('');
        
        try {
            const result = await processNamesList(inputText, showProbability);
            setOutputText(result);
        } catch (error) {
            setOutputText('Erro ao processar nomes. Tente novamente.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setCopied(false);
    };

    const handleCopy = async () => {
        if (!outputText) return;
        try {
            await navigator.clipboard.writeText(outputText);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {}
    };

    return (
        <>
            <h1 className="mb-3">Detectar Gênero e Adicionar Tratamento</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Digite ou cole uma lista de nomes (um por linha)..."
                    disabled={loading}
                />
                <div className="mt-3 d-flex flex-wrap gap-2 align-items-center">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleDetectGender}
                        disabled={loading || !inputText.trim()}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Processando...
                            </>
                        ) : (
                            'Detectar Gênero'
                        )}
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleClear}
                        disabled={loading}
                    >
                        Limpar
                    </button>
                    <button
                        className="btn btn-outline-success"
                        onClick={handleCopy}
                        disabled={!outputText || loading}
                    >
                        {copied ? 'Copiado!' : 'Copiar resultado'}
                    </button>
                    <div className="form-check ms-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="showProbability"
                            checked={showProbability}
                            onChange={(e) => setShowProbability(e.target.checked)}
                            disabled={loading}
                        />
                        <label className="form-check-label" htmlFor="showProbability">
                            Mostrar confiança
                        </label>
                    </div>
                </div>
                <textarea
                    className="form-control bg-dark text-light border-secondary mt-3"
                    value={outputText}
                    readOnly
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Resultados com tratamento aparecerão aqui..."
                />
            </div>
            <div className="mt-3">
                <small className="text-muted">
                    <strong>Nota:</strong> Esta ferramenta usa a API Genderize.io para detectar gênero baseado em nomes.
                    A API tem um limite de 1000 requisições gratuitas por dia. Nomes não reconhecidos aparecerão como "Unknown gender".
                </small>
            </div>
        </>
    );
}

export default GenderDetection;
