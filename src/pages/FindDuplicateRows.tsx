import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DuplicateGroup {
    rows: number[];
    rowData: any[];
}

function FindDuplicateRows() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const extension = selectedFile.name.split('.').pop()?.toLowerCase();
            if (extension && ['xlsx', 'xls', 'csv'].includes(extension)) {
                setFile(selectedFile);
                setFileName(selectedFile.name);
                setError('');
                setDuplicates([]);
            } else {
                setError('Por favor, selecione um arquivo Excel (.xlsx, .xls) ou CSV.');
                setFile(null);
                setFileName('');
            }
        }
    };

    const processExcel = async () => {
        if (!file) {
            setError('Por favor, selecione um arquivo.');
            return;
        }

        setIsProcessing(true);
        setError('');
        setDuplicates([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            
            // Get the first sheet
            const sheetName = workbook.SheetNames[0];
            if (!sheetName) {
                setError('O arquivo não contém planilhas.');
                setIsProcessing(false);
                return;
            }

            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

            if (data.length === 0) {
                setError('A planilha está vazia.');
                setIsProcessing(false);
                return;
            }

            // Find duplicate rows
            const rowMap = new Map<string, number[]>();
            
            data.forEach((row: any, index: number) => {
                // Convert row to string for comparison (normalize empty cells)
                const rowKey = JSON.stringify(row);
                
                if (!rowMap.has(rowKey)) {
                    rowMap.set(rowKey, []);
                }
                // Add 2 because Excel rows are 1-indexed and we want to include header row
                rowMap.get(rowKey)!.push(index + 2);
            });

            // Filter to only groups with duplicates (more than one row)
            const duplicateGroups: DuplicateGroup[] = [];
            rowMap.forEach((rows, rowKey) => {
                if (rows.length > 1) {
                    const rowData = JSON.parse(rowKey);
                    duplicateGroups.push({
                        rows: rows,
                        rowData: rowData
                    });
                }
            });

            // Sort by first row number
            duplicateGroups.sort((a, b) => a.rows[0] - b.rows[0]);

            setDuplicates(duplicateGroups);

            if (duplicateGroups.length === 0) {
                setError('Nenhuma linha duplicada encontrada.');
            }
        } catch (err) {
            console.error('Erro ao processar arquivo:', err);
            setError('Erro ao processar o arquivo. Por favor, verifique se o arquivo é válido.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClear = () => {
        setFile(null);
        setFileName('');
        setDuplicates([]);
        setError('');
        // Reset file input
        const fileInput = document.getElementById('excel-file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const formatRowData = (rowData: any[]): string => {
        return rowData.map((cell: any) => {
            if (cell === null || cell === undefined) return '';
            return String(cell);
        }).join(' | ');
    };

    return (
        <>
            <h1 className="mb-3">Encontrar Linhas Duplicadas</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Faça upload de um arquivo Excel (.xlsx, .xls) ou CSV. 
                        O sistema identificará e mostrará quais linhas são idênticas (duplicadas).
                    </small>
                </div>

                <div className="mb-3">
                    <label htmlFor="excel-file-input" className="form-label">
                        <strong>Selecione o arquivo Excel:</strong>
                    </label>
                    <input
                        id="excel-file-input"
                        type="file"
                        className="form-control bg-dark text-light border-secondary"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                        disabled={isProcessing}
                    />
                    {fileName && (
                        <small className="text-muted mt-1 d-block">
                            Arquivo selecionado: {fileName}
                        </small>
                    )}
                </div>

                {error && (
                    <div className={`alert ${error.includes('Nenhuma') ? 'alert-warning' : 'alert-danger'} mb-3`}>
                        {error}
                    </div>
                )}

                <div className="d-flex gap-2 mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={processExcel}
                        disabled={!file || isProcessing}
                    >
                        {isProcessing ? 'Processando...' : 'Processar Arquivo'}
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={handleClear}
                        disabled={isProcessing}
                    >
                        Limpar
                    </button>
                </div>

                {duplicates.length > 0 && (
                    <div className="mt-3">
                        <h5 className="mb-3">
                            Linhas Duplicadas Encontradas: {duplicates.length} grupo(s)
                        </h5>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {duplicates.map((group, groupIndex) => (
                                <div key={groupIndex} className="card bg-secondary mb-3">
                                    <div className="card-body">
                                        <h6 className="card-title text-warning">
                                            Grupo {groupIndex + 1} - Linhas: {group.rows.join(', ')}
                                        </h6>
                                        <div className="card-text">
                                            <small className="text-light">
                                                <strong>Conteúdo:</strong> {formatRowData(group.rowData)}
                                            </small>
                                        </div>
                                        <div className="mt-2">
                                            <small className="text-info">
                                                Total de cópias: {group.rows.length}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default FindDuplicateRows;

