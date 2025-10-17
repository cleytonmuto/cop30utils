import { useState } from 'react';

function normalizeNameLine(line: string): string {
    // Collapse all consecutive whitespace (spaces, tabs, etc.) to a single space and trim ends
    const collapsed = line.replace(/\s+/g, ' ').trim();
    if (!collapsed) return '';
    // Title-case each word: first letter uppercased, remaining letters lowercased
    const lowercaseConnectors = new Set(['e', 'da', 'de', 'do', 'das', 'dos']);
    return collapsed
        .split(' ')
        .map((word) => {
            const lower = word.toLowerCase();
            if (lowercaseConnectors.has(lower)) return lower;
            return word
                ? word[0].toUpperCase() + word.slice(1).toLowerCase()
                : '';
        })
        .join(' ');
}

function NormalizeName() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleNormalize = () => {
        const lines = inputText.split(/\r?\n/);
        const normalized = lines.map((line) => normalizeNameLine(line));
        setOutputText(normalized.join('\n'));
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
            <h1 className="mb-3">Normalizar Nome (espaços)</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Cole linhas com nomes; espaços extras serão removidos..."
                />
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleNormalize}
                    >
                        Normalizar
                    </button>
                    <button className="btn btn-secondary" onClick={handleClear}>
                        Limpar
                    </button>
                    <button
                        className="btn btn-outline-success"
                        onClick={handleCopy}
                        disabled={!outputText}
                    >
                        {copied ? 'Copied!' : 'Copy result'}
                    </button>
                </div>
                <textarea
                    className="form-control bg-dark text-light border-secondary mt-3"
                    value={outputText}
                    readOnly
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Resultados aparecerão aqui..."
                />
            </div>
        </>
    );
}

export default NormalizeName;
