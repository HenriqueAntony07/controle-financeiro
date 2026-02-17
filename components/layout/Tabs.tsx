interface Props {
  active: string;
  setActive: (tab: string) => void;
}

export default function Tabs({ active, setActive }: Props) {
  return (
    <div className="tabs">
      <div
        className={`tab ${active === "registro" ? "active" : ""}`}
        onClick={() => setActive("registro")}
      >
        📝 Registro de Gastos
      </div>

      <div
        className={`tab ${active === "graficos" ? "active" : ""}`}
        onClick={() => setActive("graficos")}
      >
        📊 Gráficos e Análises
      </div>

      <div
        className={`tab ${active === "resumo" ? "active" : ""}`}
        onClick={() => setActive("resumo")}
      >
        💳 Resumo Financeiro
      </div>
    </div>
  );
}
