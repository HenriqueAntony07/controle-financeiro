"use client";

import { useState } from "react";
import { useFinance } from "@/hooks/useFinance";
import Header from "./layout/Header";
import Tabs from "./layout/Tabs";
import SalarySection from "./registro/SalarySection";
import FixedExpensesSection from "./registro/FixedExpensesSection";
import VariableExpensesSection from "./registro/VariableExpensesSection";
import StatsCards from "./graficos/StatsCards";
import ChartsContainer from "./graficos/ChartsContainer";
import SummaryCard from "./resumo/SummaryCard";
import { gerarPDF } from "@/utils/pdfGenerator";
import { exportarBackup } from "@/utils/backupUtils";

export default function FinanceDashboard() {
  const [active, setActive] = useState("registro");

  const finance = useFinance();

  return (
    <div className="container">
      <Header
        onPDF={() =>
          gerarPDF({
            salario: finance.salario,
            totalGastos: finance.totalGastos,
            saldo: finance.saldo,
          })
        }
        onClear={() => localStorage.clear()}
        onExport={() => exportarBackup(finance)}
        onImport={() => {}}
      />

      <Tabs active={active} setActive={setActive} />

      <div className={`tab-content ${active === "registro" ? "active" : ""}`}>
        <SalarySection
          salario={finance.salario}
          setSalario={finance.setSalario}
        />
        <FixedExpensesSection
          gastos={finance.gastosFixos}
          setGastos={finance.setGastosFixos}
        />
        <VariableExpensesSection
          gastos={finance.gastosVariaveis}
          setGastos={finance.setGastosVariaveis}
        />
      </div>

      <div className={`tab-content ${active === "graficos" ? "active" : ""}`}>
        <div className="section">
          <h2>📊 Análise Visual dos Seus Gastos</h2>
          <StatsCards
            salario={finance.salario}
            totalGastos={finance.totalGastos}
            saldo={finance.saldo}
          />
          <ChartsContainer
            salario={finance.salario}
            gastosFixos={finance.gastosFixos}
            gastosVariaveis={finance.gastosVariaveis}
          />
        </div>
      </div>

      <div className={`tab-content ${active === "resumo" ? "active" : ""}`}>
        <SummaryCard {...finance} />
      </div>
    </div>
  );
}
