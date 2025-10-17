import { useState } from 'react';

function cleanCpf(input: string): string {
    return input.replace(/\D+/g, '');
}

function formatCpf(cpf: string): string {
    if (cpf.length !== 11) return cpf;
    return (
        cpf.substring(0, 3) +
        '.' +
        cpf.substring(3, 6) +
        '.' +
        cpf.substring(6, 9) +
        '-' +
        cpf.substring(9, 11)
    );
}

function isValidCpf(cpfRaw: string): boolean {
    const cpf = cleanCpf(cpfRaw);
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // reject repeated digits

    const calcDigit = (factorStart: number): number => {
        let sum = 0;
        for (let i = 0; i < factorStart - 1; i++) {
            sum += Number(cpf[i]) * (factorStart - i);
        }
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    const d1 = calcDigit(10);
    if (d1 !== Number(cpf[9])) return false;
    const d2 = calcDigit(11);
    return d2 === Number(cpf[10]);
}

function ValidateCpf() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleValidate = () => {
        const lines = inputText.split(/\r?\n/);
        const results = lines.map((line) => {
            const cleaned = cleanCpf(line);
            const formatted =
                cleaned.length === 11 ? formatCpf(cleaned) : cleaned;
            const ok = isValidCpf(cleaned);
            if (!cleaned) return '';
            return `${formatted} - ${ok ? 'VÁLIDO' : 'INVÁLIDO'}`;
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
            <h1 className="mb-3">Validar CPF</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Cole linhas com CPFs para validar..."
                />
                <div className="mt-3 d-flex flex-wrap gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleValidate}
                    >
                        Validar
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

export default ValidateCpf;
