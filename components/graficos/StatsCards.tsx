interface Props {
  salario: number;
  totalGastos: number;
  saldo: number;
}

export default function StatsCards({ salario, totalGastos, saldo }: Props) {
  const taxa = salario > 0 ? ((saldo / salario) * 100).toFixed(1) : "0";

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h4>💰 TOTAL DE RECEITAS</h4>
        <div className="value">R$ {salario.toFixed(2)}</div>
      </div>

      <div className="stat-card">
        <h4>💸 TOTAL DE GASTOS</h4>
        <div className="value">R$ {totalGastos.toFixed(2)}</div>
      </div>

      <div className="stat-card">
        <h4>📊 TAXA DE POUPANÇA</h4>
        <div className="value">{taxa}%</div>
      </div>

      <div className="stat-card">
        <h4>🎯 SALDO FINAL</h4>
        <div className="value">R$ {saldo.toFixed(2)}</div>
      </div>
    </div>
  );
}
