import { useState } from 'react';

function compareLists(list1: string, list2: string): string[] {
    // Split both lists into arrays of lines and trim whitespace
    const lines1 = list1
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    
    const lines2 = list2
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    
    // Convert first list to a Set for O(1) lookup
    const set1 = new Set(lines1);
    
    // Find elements in list2 that are NOT in list1
    const notInList1 = lines2.filter((line) => !set1.has(line));
    
    return notInList1;
}

function CompareLists() {
    const [list1, setList1] = useState<string>('');
    const [list2, setList2] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleCompare = () => {
        const notInList1 = compareLists(list1, list2);
        
        if (notInList1.length === 0) {
            setOutputText('Todos os elementos da Lista 2 estão presentes na Lista 1.');
            return;
        }
        
        setOutputText(notInList1.join('\n'));
    };

    const handleClear = () => {
        setList1('');
        setList2('');
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
            <h1 className="mb-3">Comparar Listas</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Cole duas listas de elementos, um por linha. 
                        O sistema encontrará e exibirá os elementos da Lista 2 que NÃO estão na Lista 1.
                    </small>
                </div>
                
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            <strong>Lista 1:</strong>
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={list1}
                            onChange={(e) => setList1(e.target.value)}
                            rows={10}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Cole a primeira lista, um elemento por linha..."
                        />
                    </div>
                    
                    <div className="col-md-6">
                        <label className="form-label">
                            <strong>Lista 2:</strong>
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={list2}
                            onChange={(e) => setList2(e.target.value)}
                            rows={10}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Cole a segunda lista, um elemento por linha..."
                        />
                    </div>
                </div>
                
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleCompare}
                        disabled={!list1.trim() || !list2.trim()}
                    >
                        Comparar Listas
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

                <label className="form-label mt-3">
                    <strong>Elementos da Lista 2 que não estão na Lista 1:</strong>
                </label>
                <textarea
                    className="form-control bg-dark text-light border-secondary"
                    value={outputText}
                    readOnly
                    rows={10}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Os elementos da Lista 2 que não estão na Lista 1 aparecerão aqui..."
                />
            </div>
        </>
    );
}

export default CompareLists;

