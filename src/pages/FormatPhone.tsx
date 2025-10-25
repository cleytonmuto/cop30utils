import { useState } from 'react';

function formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D+/g, '');
    
    // If we have less than 10 digits, pad with zeros at the beginning
    if (digits.length < 10) {
        const padded = digits.padStart(10, '0');
        return `(${padded.substring(0, 2)})${padded.substring(2, 7)}-${padded.substring(7, 11)}`;
    }
    
    // If we have exactly 10 digits, format as (00)00000-0000
    if (digits.length === 10) {
        return `(${digits.substring(0, 2)})${digits.substring(2, 7)}-${digits.substring(7, 10)}`;
    }
    
    // If we have 11 digits, format as (00)00000-0000 (assuming first digit is area code)
    if (digits.length === 11) {
        return `(${digits.substring(0, 2)})${digits.substring(2, 7)}-${digits.substring(7, 11)}`;
    }
    
    // For longer numbers, take the last 10 digits
    if (digits.length > 11) {
        const lastTen = digits.slice(-10);
        return `(${lastTen.substring(0, 2)})${lastTen.substring(2, 7)}-${lastTen.substring(7, 10)}`;
    }
    
    return phone; // Return original if no valid format can be applied
}

function FormatPhone() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleConvert = () => {
        const lines = inputText.split(/\r?\n/);
        const processed = lines.map((line) => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            return formatPhoneNumber(trimmed);
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
            <h1 className="mb-3">Formatar Telefone</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Digite ou cole os números de telefone aqui..."
                />
                <div className="mt-3 d-flex flex-wrap gap-2">
                    <button className="btn btn-primary" onClick={handleConvert}>
                        Formatar Telefones
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
                    style={{ width: '100%', resize: 'vertical', marginTop: 12 }}
                    placeholder="Telefones formatados aparecerão aqui..."
                />
            </div>
        </>
    );
}

export default FormatPhone;
