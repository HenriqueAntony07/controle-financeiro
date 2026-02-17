"use client";

interface Props {
  onPDF: () => void;
  onClear: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Header({ onPDF, onClear, onExport, onImport }: Props) {
  return (
    <div className="header">
      <h1>💰 Controle Financeiro PRO</h1>
      <p>Gerencie suas finanças com gráficos, categorias e relatórios em PDF</p>

      <div className="header-actions">
        <button className="btn-header" onClick={onPDF}>
          📄 Gerar Relatório PDF
        </button>

        <button className="btn-header" onClick={onClear}>
          🗑️ Limpar Todos os Dados
        </button>

        <button className="btn-header" onClick={onExport}>
          💾 Exportar Backup
        </button>

        <label className="btn-header">
          📥 Importar Backup
          <input
            type="file"
            hidden
            accept=".json"
            onChange={(e) =>
              e.target.files && onImport(e.target.files[0])
            }
          />
        </label>
      </div>
    </div>
  );
}
