import { useState } from 'react';

function sortByLength(inputText: string): string[] {
    const lines = inputText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    
    // Sort by length in ascending order
    return lines.sort((a, b) => a.length - b.length);
}

function SortByLength() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleSort = () => {
        const sorted = sortByLength(inputText);
        setOutputText(sorted.join('\n'));
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
            <h1 className="mb-3">Ordenar por Tamanho</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Cole uma lista de strings, uma por linha. 
                        O sistema ordenará as strings em ordem crescente de tamanho (comprimento).
                    </small>
                </div>
                
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={10}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Cole a lista de strings, uma por linha..."
                />
                
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleSort}
                        disabled={!inputText.trim()}
                    >
                        Ordenar por Tamanho
                    </button>
                    <button className="btn btn-secondary" onClick={handleClear}>
                        Limpar
                    </button>
                    <button
                        className="btn btn-outline-success"
                        onClick={handleCopy}
                        disabled={!outputText}
                    >
                        {copied ? 'Copiado!' : 'Copiar resultado'}
                    </button>
                </div>

                <textarea
                    className="form-control bg-dark text-light border-secondary mt-3"
                    value={outputText}
                    readOnly
                    rows={10}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="A lista ordenada por tamanho aparecerá aqui..."
                />
            </div>
        </>
    );
}

export default SortByLength;

