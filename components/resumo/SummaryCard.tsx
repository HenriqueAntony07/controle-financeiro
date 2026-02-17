interface Props {
  salario: number;
  totalFixos: number;
  totalVariaveis: number;
  totalGastos: number;
  saldo: number;
}

export default function SummaryCard({
  salario,
  totalFixos,
  totalVariaveis,
  totalGastos,
  saldo,
}: Props) {
  return (
    <div className="summary">
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>
        💳 Resumo Financeiro Completo
      </h2>

      <div className="summary-item">
        <span>💵 Salário:</span>
        <span>R$ {salario.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span>📋 Total Gastos Fixos:</span>
        <span>R$ {totalFixos.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span>🛒 Total Gastos Variáveis:</span>
        <span>R$ {totalVariaveis.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span>💸 Total de Gastos:</span>
        <span>R$ {totalGastos.toFixed(2)}</span>
      </div>

      <div className="summary-item total">
        <span>💰 Saldo Disponível:</span>
        <span className={saldo >= 0 ? "positive" : "negative"}>
          R$ {saldo.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
