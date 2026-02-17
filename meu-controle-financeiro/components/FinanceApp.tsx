"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Charts from "./Charts";

interface Gasto {
  nome: string;
  valor: number;
  categoria: string;
}

export default function FinanceApp() {
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

  const adicionarFixo = (nome: string, valor: number, categoria: string) => {
    setGastosFixos([...gastosFixos, { nome, valor, categoria }]);
  };

  const adicionarVariavel = (
    nome: string,
    valor: number,
    categoria: string
  ) => {
    setGastosVariaveis([...gastosVariaveis, { nome, valor, categoria }]);
  };

  const totalFixos = gastosFixos.reduce((a, b) => a + b.valor, 0);
  const totalVariaveis = gastosVariaveis.reduce((a, b) => a + b.valor, 0);
  const totalGastos = totalFixos + totalVariaveis;
  const saldo = salario - totalGastos;

  const exportarPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Relatório Financeiro", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Salário: R$ ${salario.toFixed(2)}`, 20, 40);
    pdf.text(`Total Gastos: R$ ${totalGastos.toFixed(2)}`, 20, 50);
    pdf.text(`Saldo: R$ ${saldo.toFixed(2)}`, 20, 60);
    pdf.save("relatorio-financeiro.pdf");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>💰 Controle Financeiro PRO</h1>

      <div>
        <input
          type="number"
          placeholder="Salário"
          value={salario}
          onChange={(e) => setSalario(Number(e.target.value))}
        />
      </div>

      <h2>Resumo</h2>
      <p>Fixos: R$ {totalFixos.toFixed(2)}</p>
      <p>Variáveis: R$ {totalVariaveis.toFixed(2)}</p>
      <p>Total: R$ {totalGastos.toFixed(2)}</p>
      <p>Saldo: R$ {saldo.toFixed(2)}</p>

      <button onClick={exportarPDF}>Gerar PDF</button>

      <Charts
        salario={salario}
        fixos={totalFixos}
        variaveis={totalVariaveis}
      />
    </div>
  );
}
