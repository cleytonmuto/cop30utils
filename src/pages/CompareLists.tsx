import { useState } from 'react';

interface CompareResult {
    notInList2: string[];
    notInList1: string[];
    common: string[];
}

function compareLists(list1: string, list2: string): CompareResult {
    // Split both lists into arrays of lines and trim whitespace
    const lines1 = list1
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    
    const lines2 = list2
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    
    // Convert lists to Sets for O(1) lookup
    const set1 = new Set(lines1);
    const set2 = new Set(lines2);
    
    // Find elements in list1 that are NOT in list2
    const notInList2 = lines1.filter((line) => !set2.has(line));
    
    // Find elements in list2 that are NOT in list1
    const notInList1 = lines2.filter((line) => !set1.has(line));
    
    // Find common elements
    const common = lines1.filter((line) => set2.has(line));
    
    return { notInList2, notInList1, common };
}

function CompareLists() {
    const [list1, setList1] = useState<string>('');
    const [list2, setList2] = useState<string>('');
    const [outputNotInList1, setOutputNotInList1] = useState<string>('');
    const [outputNotInList2, setOutputNotInList2] = useState<string>('');
    const [outputCommon, setOutputCommon] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const handleCompare = () => {
        const result = compareLists(list1, list2);
        
        // Set output for elements in List 2 that are NOT in List 1
        setOutputNotInList1(
            result.notInList1.length > 0
                ? result.notInList1.join('\n')
                : '(Nenhum)'
        );
        
        // Set output for elements in List 1 that are NOT in List 2
        setOutputNotInList2(
            result.notInList2.length > 0
                ? result.notInList2.join('\n')
                : '(Nenhum)'
        );
        
        // Set output for common elements
        setOutputCommon(
            result.common.length > 0
                ? result.common.join('\n')
                : '(Nenhum)'
        );
    };

    const handleClear = () => {
        setList1('');
        setList2('');
        setOutputNotInList1('');
        setOutputNotInList2('');
        setOutputCommon('');
        setCopied(false);
    };

    const handleCopy = async () => {
        const combinedResult = [
            '=== Elementos da Lista 2 que NÃO estão na Lista 1 ===',
            outputNotInList1,
            '',
            '=== Elementos da Lista 1 que NÃO estão na Lista 2 ===',
            outputNotInList2,
            '',
            '=== Elementos Comuns (presentes em ambas as listas) ===',
            outputCommon
        ].join('\n');
        
        if (!combinedResult) return;
        try {
            await navigator.clipboard.writeText(combinedResult);
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
                        O sistema mostrará: (1) elementos da Lista 2 que não estão na Lista 1, 
                        (2) elementos da Lista 1 que não estão na Lista 2, e (3) elementos comuns a ambas as listas.
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
                        disabled={!outputNotInList1 && !outputNotInList2 && !outputCommon}
                    >
                        {copied ? 'Copiado!' : 'Copiar todos os resultados'}
                    </button>
                </div>

                <div className="row g-3 mt-3">
                    <div className="col-md-4">
                        <label className="form-label">
                            <strong>Elementos da Lista 1 que NÃO estão na Lista 2:</strong>
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={outputNotInList2}
                            readOnly
                            rows={10}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Elementos exclusivos da Lista 1 aparecerão aqui..."
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">
                            <strong>Elementos Comuns (presentes em ambas as listas):</strong>
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={outputCommon}
                            readOnly
                            rows={10}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Elementos comuns aparecerão aqui..."
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">
                            <strong>Elementos da Lista 2 que NÃO estão na Lista 1:</strong>
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary"
                            value={outputNotInList1}
                            readOnly
                            rows={10}
                            style={{ width: '100%', resize: 'vertical' }}
                            placeholder="Elementos exclusivos da Lista 2 aparecerão aqui..."
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompareLists;

