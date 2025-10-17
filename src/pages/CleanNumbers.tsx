import { useState } from 'react';

function CleanNumbers() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleConvert = () => {
        const lines = inputText.split(/\r?\n/);
        const processed = lines.map((line) => {
            let cpf = line.replace(/\D+/g, '');
            if (cpf.length < 11) {
                cpf = cpf.padStart(11, '0');
            }
            if (cpf.length === 11) {
                cpf =
                    cpf.substring(0, 3) +
                    '.' +
                    cpf.substring(3, 6) +
                    '.' +
                    cpf.substring(6, 9) +
                    '-' +
                    cpf.substring(9, 11);
            }
            return cpf;
        });
        setOutputText(processed.join('\n'));
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
            <h1 className="mb-3">Limpar CPF</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Type or paste text here..."
                />
                <div className="mt-3 d-flex flex-wrap gap-2">
                    <button className="btn btn-primary" onClick={handleConvert}>
                        Clean non-digits
                    </button>
                    <button className="btn btn-secondary" onClick={handleClear}>
                        Clear
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
                    style={{ width: '100%', resize: 'vertical', marginTop: 12 }}
                    placeholder="Converted text will appear here..."
                />
            </div>
        </>
    );
}

export default CleanNumbers;
