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
            <h1>Lowercase to Uppercase</h1>
            <div className="card">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Type or paste text here..."
                />
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <button onClick={handleConvert}>
                        Convert to UPPERCASE
                    </button>
                    <button onClick={handleClear}>Clear</button>
                    <button onClick={handleCopy} disabled={!outputText}>
                        {copied ? 'Copied!' : 'Copy result'}
                    </button>
                </div>
                <textarea
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

export default ToUpper;
