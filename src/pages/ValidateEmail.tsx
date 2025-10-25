import { useState } from 'react';

function isValidEmail(email: string): boolean {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Additional checks
    if (!email || email.trim() === '') return false;
    
    const trimmedEmail = email.trim();
    
    // Check if email matches the regex pattern
    if (!emailRegex.test(trimmedEmail)) return false;
    
    // Check for common invalid patterns
    if (trimmedEmail.includes('..')) return false; // No consecutive dots
    if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) return false; // No leading/trailing dots
    if (trimmedEmail.includes('@.') || trimmedEmail.includes('.@')) return false; // No dots around @
    
    // Check length constraints
    if (trimmedEmail.length > 254) return false; // RFC 5321 limit
    
    // Split email into local and domain parts
    const [localPart, domainPart] = trimmedEmail.split('@');
    
    // Check local part (before @)
    if (localPart.length === 0 || localPart.length > 64) return false; // RFC 5321 limit
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
    
    // Check domain part (after @)
    if (domainPart.length === 0 || domainPart.length > 253) return false;
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) return false;
    
    return true;
}

function ValidateEmail() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleValidate = () => {
        const lines = inputText.split(/\r?\n/);
        const results = lines.map((line) => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            const isValid = isValidEmail(trimmed);
            return `${trimmed} - ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`;
        });
        setOutputText(results.join('\n'));
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
            <h1 className="mb-3">Validar E-mails</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Digite ou cole os endereços de e-mail aqui (um por linha)..."
                />
                <div className="mt-3 d-flex flex-wrap gap-2">
                    <button className="btn btn-primary" onClick={handleValidate}>
                        Validar E-mails
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
                    placeholder="Resultados da validação aparecerão aqui..."
                />
            </div>
        </>
    );
}

export default ValidateEmail;
