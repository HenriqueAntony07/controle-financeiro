"use client";

import { useEffect, useState } from "react";
import { Gasto, FinanceData } from "@/types/finance";

export const categoriasInfo: Record<string, any> = {
  moradia: { nome: "Moradia", icon: "🏠", cor: "#1976d2" },
  alimentacao: { nome: "Alimentação", icon: "🍽️", cor: "#f57c00" },
  transporte: { nome: "Transporte", icon: "🚗", cor: "#7b1fa2" },
  saude: { nome: "Saúde", icon: "💊", cor: "#388e3c" },
  educacao: { nome: "Educação", icon: "📚", cor: "#f57f17" },
  lazer: { nome: "Lazer", icon: "🎉", cor: "#c2185b" },
  vestuario: { nome: "Vestuário", icon: "👕", cor: "#00796b" },
  outros: { nome: "Outros", icon: "📦", cor: "#5d4037" },
};

export function useFinance() {
  const [salario, setSalario] = useState<number>(0);
  const [gastosFixos, setGastosFixos] = useState<Gasto[]>([]);
  const [gastosVariaveis, setGastosVariaveis] = useState<Gasto[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("finance-data");
    if (saved) {
      const parsed: FinanceData = JSON.parse(saved);
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

  return {
    salario,
    setSalario,
    gastosFixos,
    setGastosFixos,
    gastosVariaveis,
    setGastosVariaveis,
    totalFixos,
    totalVariaveis,
    totalGastos,
    saldo,
  };
}
