import { useState } from 'react';

interface DuplicateInfo {
    line: string;
    count: number;
}

function removeDuplicates(inputText: string): DuplicateInfo[] {
    const lines = inputText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    
    // Count occurrences while preserving order
    const lineMap = new Map<string, number>();
    const order: string[] = [];
    
    for (const line of lines) {
        if (!lineMap.has(line)) {
            lineMap.set(line, 0);
            order.push(line);
        }
        lineMap.set(line, lineMap.get(line)! + 1);
    }
    
    // Create array with line and count
    return order.map(line => ({
        line,
        count: lineMap.get(line)!
    }));
}

function RemoveDuplicates() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleRemoveDuplicates = () => {
        const unique = removeDuplicates(inputText);
        const formatted = unique.map(item => {
            if (item.count > 1) {
                return `${item.line} (${item.count}x)`;
            }
            return item.line;
        });
        setOutputText(formatted.join('\n'));
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
            <h1 className="mb-3">Remover Duplicatas</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Cole uma lista de nomes, um por linha. 
                        O sistema removerá duplicatas e retornará apenas os nomes únicos, mantendo a ordem original. 
                        Repetições serão marcadas com o número de ocorrências.
                    </small>
                </div>
                
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={10}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Cole a lista de nomes, um por linha..."
                />
                
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleRemoveDuplicates}
                        disabled={!inputText.trim()}
                    >
                        Remover Duplicatas
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
                    placeholder="A lista sem duplicatas aparecerá aqui. Repetições aparecerão com (Nx) indicando o número de ocorrências..."
                />
            </div>
        </>
    );
}

export default RemoveDuplicates;

