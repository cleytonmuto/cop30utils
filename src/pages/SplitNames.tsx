import { useState } from 'react';

function splitNames(inputText: string): { firstNames: string; lastNames: string } {
    const lines = inputText.split(/\r?\n/).filter(line => line.trim());
    const firstNames: string[] = [];
    const lastNames: string[] = [];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 2) {
            // First name is the first part
            firstNames.push(parts[0]);
            // Last name is only the final word
            lastNames.push(parts[parts.length - 1]);
        } else if (parts.length === 1) {
            // If only one part, treat it as first name
            firstNames.push(parts[0]);
            lastNames.push('');
        }
    });

    return {
        firstNames: firstNames.join('\n'),
        lastNames: lastNames.join('\n')
    };
}

function SplitNames() {
    const [inputText, setInputText] = useState<string>('');
    const [firstNames, setFirstNames] = useState<string>('');
    const [lastNames, setLastNames] = useState<string>('');
    const [copiedFirst, setCopiedFirst] = useState<boolean>(false);
    const [copiedLast, setCopiedLast] = useState<boolean>(false);

    const handleSplit = () => {
        const result = splitNames(inputText);
        setFirstNames(result.firstNames);
        setLastNames(result.lastNames);
    };

    const handleClear = () => {
        setInputText('');
        setFirstNames('');
        setLastNames('');
        setCopiedFirst(false);
        setCopiedLast(false);
    };

    const handleCopyFirst = async () => {
        if (!firstNames) return;
        try {
            await navigator.clipboard.writeText(firstNames);
            setCopiedFirst(true);
            setTimeout(() => setCopiedFirst(false), 1500);
        } catch {}
    };

    const handleCopyLast = async () => {
        if (!lastNames) return;
        try {
            await navigator.clipboard.writeText(lastNames);
            setCopiedLast(true);
            setTimeout(() => setCopiedLast(false), 1500);
        } catch {}
    };

    return (
        <>
            <h1 className="mb-3">Separar Nomes</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <h5 className="mb-3">Nomes Completos</h5>
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={6}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Cole uma lista de nomes completos, um por linha..."
                />
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleSplit}
                    >
                        Separar Nomes
                    </button>
                    <button className="btn btn-secondary" onClick={handleClear}>
                        Limpar
                    </button>
                </div>
                
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h5 className="mb-3">Primeiros Nomes</h5>
                        <div className="d-flex gap-2 mb-2">
                            <button
                                className="btn btn-outline-success btn-sm"
                                onClick={handleCopyFirst}
                                disabled={!firstNames}
                            >
                                {copiedFirst ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={firstNames}
                            readOnly
                            rows={6}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Primeiros nomes aparecerão aqui..."
                        />
                    </div>
                    <div className="col-md-6">
                        <h5 className="mb-3">Sobrenomes</h5>
                        <div className="d-flex gap-2 mb-2">
                            <button
                                className="btn btn-outline-success btn-sm"
                                onClick={handleCopyLast}
                                disabled={!lastNames}
                            >
                                {copiedLast ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={lastNames}
                            readOnly
                            rows={6}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Sobrenomes aparecerão aqui..."
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SplitNames;
