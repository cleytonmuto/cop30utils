import { useState } from 'react';

function ToUpper() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleConvert = () => {
        setOutputText(inputText.toUpperCase());
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
            <h1 className="mb-3">lowercase to UPPERCASE</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Type or paste text here..."
                />
                <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-primary" onClick={handleConvert}>
                        Convert to UPPERCASE
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
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Converted text will appear here..."
                />
            </div>
        </>
    );
}

export default ToUpper;
