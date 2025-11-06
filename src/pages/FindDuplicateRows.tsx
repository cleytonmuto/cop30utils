import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DuplicateGroup {
    rows: number[];
    rowData: any[];
    specificColumns?: { [key: string]: any };
}

function FindDuplicateRows() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [originalData, setOriginalData] = useState<any[][]>([]);
    const [originalHeaders, setOriginalHeaders] = useState<any[]>([]);

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

            // Store original data and headers
            setOriginalHeaders((data[0] as any[]) || []);
            setOriginalData(data as any[][]);

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

    const processExcelByColumns = async () => {
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
            // Get data with headers for processing
            const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
            // Get raw data with headers for export
            const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

            if (data.length === 0) {
                setError('A planilha está vazia.');
                setIsProcessing(false);
                return;
            }

            // Store original data and headers
            setOriginalHeaders((rawData[0] as any[]) || []);
            setOriginalData(rawData as any[][]);

            // Required columns
            const requiredColumns = ['First Name', 'Last Name', 'Id Number', 'Birth Date', 'Email'];
            
            // Check if all required columns exist
            const firstRow = data[0] as any;
            const missingColumns = requiredColumns.filter(col => !(col in firstRow));
            
            if (missingColumns.length > 0) {
                setError(`Colunas obrigatórias não encontradas: ${missingColumns.join(', ')}`);
                setIsProcessing(false);
                return;
            }

            // Find duplicate rows based on specific columns
            const rowMap = new Map<string, { rows: number[], rowData: any }>();
            
            data.forEach((row: any, index: number) => {
                // Extract only the required columns
                const keyData: { [key: string]: any } = {};
                requiredColumns.forEach(col => {
                    keyData[col] = row[col] ?? '';
                });
                
                // Create a key from the specific columns
                const rowKey = JSON.stringify(keyData);
                
                if (!rowMap.has(rowKey)) {
                    rowMap.set(rowKey, { rows: [], rowData: keyData });
                }
                // Add 2 because Excel rows are 1-indexed and we want to include header row
                rowMap.get(rowKey)!.rows.push(index + 2);
            });

            // Filter to only groups with duplicates (more than one row)
            const duplicateGroups: DuplicateGroup[] = [];
            rowMap.forEach((value, rowKey) => {
                if (value.rows.length > 1) {
                    duplicateGroups.push({
                        rows: value.rows,
                        rowData: [],
                        specificColumns: value.rowData
                    });
                }
            });

            // Sort by first row number
            duplicateGroups.sort((a, b) => a.rows[0] - b.rows[0]);

            setDuplicates(duplicateGroups);

            if (duplicateGroups.length === 0) {
                setError('Nenhuma linha duplicada encontrada baseada nas colunas especificadas.');
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
        setCopied(false);
        setOriginalData([]);
        setOriginalHeaders([]);
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

    const formatSpecificColumns = (columns: { [key: string]: any }): string => {
        return Object.entries(columns)
            .map(([key, value]) => `${key}: ${value ?? ''}`)
            .join(' | ');
    };

    const formatResultsForCopy = (): string => {
        if (duplicates.length === 0) return '';
        
        const lines: string[] = [];
        lines.push(`Linhas Duplicadas Encontradas: ${duplicates.length} grupo(s)\n`);
        
        duplicates.forEach((group, groupIndex) => {
            lines.push(`Grupo ${groupIndex + 1} - Linhas: ${group.rows.join(', ')}`);
            if (group.specificColumns) {
                lines.push(`Conteúdo: ${formatSpecificColumns(group.specificColumns)}`);
            } else {
                lines.push(`Conteúdo: ${formatRowData(group.rowData)}`);
            }
            lines.push(`Total de cópias: ${group.rows.length}`);
            lines.push(''); // Empty line between groups
        });
        
        return lines.join('\n');
    };

    const handleCopy = async () => {
        if (duplicates.length === 0) return;
        
        try {
            const textToCopy = formatResultsForCopy();
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    const handleDownload = () => {
        if (duplicates.length === 0 || originalData.length === 0) return;

        try {
            // Create new workbook
            const newWorkbook = XLSX.utils.book_new();
            
            // Prepare data: headers + one example of each duplicate group
            const exportData: any[][] = [];
            
            // Add headers
            if (originalHeaders.length > 0) {
                exportData.push(originalHeaders);
            }
            
            // Add one example of each duplicate group (using the first row number from each group)
            duplicates.forEach((group) => {
                // Get the first row number from the group (Excel row number, 1-indexed)
                const firstRowNumber = group.rows[0];
                // Convert to array index (subtract 2: 1 for 0-indexing, 1 for header row)
                const rowIndex = firstRowNumber - 2;
                
                if (rowIndex >= 0 && rowIndex < originalData.length) {
                    exportData.push(originalData[rowIndex]);
                }
            });
            
            // Create worksheet from data
            const newWorksheet = XLSX.utils.aoa_to_sheet(exportData);
            
            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Duplicatas');
            
            // Generate file and download
            const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `duplicatas_${Date.now()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Erro ao baixar arquivo:', err);
            setError('Erro ao gerar o arquivo Excel. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <h1 className="mb-3">Encontrar Linhas Duplicadas</h1>
            <div className="card p-3 bg-dark text-light border-secondary">
                <div className="alert alert-info mb-3">
                    <small>
                        <strong>Instruções:</strong> Faça upload de um arquivo Excel (.xlsx, .xls) ou CSV. 
                        <br />
                        • <strong>Comparar Todas as Colunas:</strong> Identifica linhas completamente idênticas.
                        <br />
                        • <strong>Comparar Colunas Específicas:</strong> Compara apenas as colunas "First Name", "Last Name", "Id Number", "Birth Date", "Email".
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
                        {isProcessing ? 'Processando...' : 'Comparar Todas as Colunas'}
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={processExcelByColumns}
                        disabled={!file || isProcessing}
                    >
                        {isProcessing ? 'Processando...' : 'Comparar Colunas Específicas'}
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
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">
                                Linhas Duplicadas Encontradas: {duplicates.length} grupo(s)
                            </h5>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-success"
                                    onClick={handleCopy}
                                    disabled={duplicates.length === 0}
                                >
                                    {copied ? 'Copiado!' : 'Copiar resultado'}
                                </button>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={handleDownload}
                                    disabled={duplicates.length === 0}
                                >
                                    Baixar Excel
                                </button>
                            </div>
                        </div>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {duplicates.map((group, groupIndex) => (
                                <div key={groupIndex} className="card bg-secondary mb-3">
                                    <div className="card-body">
                                        <h6 className="card-title text-warning">
                                            Grupo {groupIndex + 1} - Linhas: {group.rows.join(', ')}
                                        </h6>
                                        <div className="card-text">
                                            <small className="text-light">
                                                <strong>Conteúdo:</strong> {
                                                    group.specificColumns 
                                                        ? formatSpecificColumns(group.specificColumns)
                                                        : formatRowData(group.rowData)
                                                }
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

