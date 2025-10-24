import { useState } from 'react';

interface RepeatInfo {
    content: string;
    lineNumbers: number[];
    count: number;
}

function detectRepeats(inputText: string): RepeatInfo[] {
    const lines = inputText.split(/\r?\n/);
    const lineMap = new Map<string, number[]>();
    
    // Group lines by content and track line numbers
    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return; // Skip empty lines
        
        if (!lineMap.has(trimmed)) {
            lineMap.set(trimmed, []);
        }
        lineMap.get(trimmed)!.push(index + 1); // 1-based line numbers
    });
    
    // Filter only repeated lines and format results
    const repeats: RepeatInfo[] = [];
    lineMap.forEach((lineNumbers, content) => {
        if (lineNumbers.length > 1) {
            repeats.push({
                content,
                lineNumbers,
                count: lineNumbers.length
            });
        }
    });
    
    // Sort by first occurrence line number
    return repeats.sort((a, b) => a.lineNumbers[0] - b.lineNumbers[0]);
}

function DetectRepeats() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleDetect = () => {
        const repeats = detectRepeats(inputText);
        
        if (repeats.length === 0) {
            setOutputText('Nenhuma linha repetida encontrada.');
            return;
        }
        
        const result = repeats.map(repeat => {
            const lineNumbersStr = repeat.lineNumbers.join(', ');
            return `${repeat.content} (linhas: ${lineNumbersStr}, ${repeat.count}x)`;
        }).join('\n');
        
        setOutputText(result);
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
            <h1 className="mb-3">Detectar Linhas Repetidas</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Cole uma lista de nomes, um por linha. 
                        O sistema detectará linhas repetidas e mostrará o conteúdo e os números das linhas onde aparecem.
                    </small>
                </div>
                
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Cole uma lista de nomes, um por linha..."
                />
                
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleDetect}
                        disabled={!inputText.trim()}
                    >
                        Detectar Repetições
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
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="As linhas repetidas aparecerão aqui com os números das linhas..."
                />
            </div>
        </>
    );
}

export default DetectRepeats;
