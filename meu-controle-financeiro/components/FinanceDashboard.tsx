"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Charts from "./Charts";

interface Gasto {
  nome: string;
  valor: number;
  categoria: string;
}

const categoriasInfo: any = {
  moradia: { nome: "Moradia", icon: "🏠", cor: "#1976d2" },
  alimentacao: { nome: "Alimentação", icon: "🍽️", cor: "#f57c00" },
  transporte: { nome: "Transporte", icon: "🚗", cor: "#7b1fa2" },
  saude: { nome: "Saúde", icon: "💊", cor: "#388e3c" },
  educacao: { nome: "Educação", icon: "📚", cor: "#f57f17" },
  lazer: { nome: "Lazer", icon: "🎉", cor: "#c2185b" },
  vestuario: { nome: "Vestuário", icon: "👕", cor: "#00796b" },
  outros: { nome: "Outros", icon: "📦", cor: "#5d4037" },
};

export default function FinanceDashboard() {
  const [aba, setAba] = useState("registro");
  const [salario, setSalario] = useState<number>(0);
  const [gastosFixos, setGastosFixos] = useState<Gasto[]>([]);
  const [gastosVariaveis, setGastosVariaveis] = useState<Gasto[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("finance-data");
    if (data) {
      const parsed = JSON.parse(data);
      setSalario(parsed.salario || 0);
      setGastosFixos(parsed.gastosFixos || []);
      setGastosVariaveis(parsed.gastosVariaveis || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "finance-data",
      JSON.stringify({ salario, gastosFixos, gastosVariaveis })
    );
  }, [salario, gastosFixos, gastosVariaveis]);

  const totalFixos = gastosFixos.reduce((a, b) => a + b.valor, 0);
  const totalVariaveis = gastosVariaveis.reduce((a, b) => a + b.valor, 0);
  const totalGastos = totalFixos + totalVariaveis;
  const saldo = salario - totalGastos;

  const adicionarFixo = (nome: string, valor: number, categoria: string) => {
    setGastosFixos([...gastosFixos, { nome, valor, categoria }]);
  };

  const exportarPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Relatório Financeiro", 20, 20);
    pdf.text(`Salário: R$ ${salario.toFixed(2)}`, 20, 40);
    pdf.text(`Total Gastos: R$ ${totalGastos.toFixed(2)}`, 20, 50);
    pdf.text(`Saldo: R$ ${saldo.toFixed(2)}`, 20, 60);
    pdf.save("relatorio-financeiro.pdf");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>💰 Controle Financeiro PRO</h1>
        <p>Gerencie suas finanças com gráficos e relatórios</p>

        <div className="header-actions">
          <button className="btn-header" onClick={exportarPDF}>
            📄 Gerar Relatório PDF
          </button>
        </div>
      </div>

      <div className="tabs">
        <div
          className={`tab ${aba === "registro" ? "active" : ""}`}
          onClick={() => setAba("registro")}
        >
          📝 Registro de Gastos
        </div>

        <div
          className={`tab ${aba === "graficos" ? "active" : ""}`}
          onClick={() => setAba("graficos")}
        >
          📊 Gráficos e Análises
        </div>

        <div
          className={`tab ${aba === "resumo" ? "active" : ""}`}
          onClick={() => setAba("resumo")}
        >
          💳 Resumo Financeiro
        </div>
      </div>

      {aba === "registro" && (
        <div className="section">
          <h2>💵 Salário Mensal</h2>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(Number(e.target.value))}
          />
        </div>
      )}

      {aba === "graficos" && (
        <div className="section">
          <Charts
            salario={salario}
            fixos={totalFixos}
            variaveis={totalVariaveis}
          />
        </div>
      )}

      {aba === "resumo" && (
        <div className="summary">
          <div className="summary-item">
            <span>Salário:</span>
            <span>R$ {salario.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Saldo:</span>
            <span className={saldo >= 0 ? "positive" : "negative"}>
              R$ {saldo.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
