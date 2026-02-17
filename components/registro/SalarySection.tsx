interface Props {
  salario: number;
  setSalario: (value: number) => void;
}

export default function SalarySection({ salario, setSalario }: Props) {
  return (
    <div className="section">
      <h2>💵 Salário Mensal</h2>

      <div className="input-group">
        <label>Seu salário:</label>
        <input
          type="number"
          value={salario || ""}
          placeholder="Ex: 3000.00"
          step="0.01"
          min="0"
          onChange={(e) => setSalario(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
