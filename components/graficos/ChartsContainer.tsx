"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import { categoriasInfo } from "@/hooks/useFinance";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  salario: number;
  gastosFixos: any[];
  gastosVariaveis: any[];
}

export default function ChartsContainer({
  salario,
  gastosFixos,
  gastosVariaveis,
}: Props) {
  const todos = [...gastosFixos, ...gastosVariaveis];

  const categorias: Record<string, number> = {};
  todos.forEach((g) => {
    categorias[g.categoria] =
      (categorias[g.categoria] || 0) + g.valor;
  });

  const totalFixos = gastosFixos.reduce((a, b) => a + b.valor, 0);
  const totalVariaveis = gastosVariaveis.reduce((a, b) => a + b.valor, 0);
  const saldo = salario - totalFixos - totalVariaveis;

  return (
    <>
      <div className="charts-container">
        <div className="chart-box">
          <h3>📊 Distribuição por Categoria</h3>
          <Doughnut
            data={{
              labels: Object.keys(categorias).map(
                (c) => categoriasInfo[c].nome
              ),
              datasets: [
                {
                  data: Object.values(categorias),
                  backgroundColor: Object.keys(categorias).map(
                    (c) => categoriasInfo[c].cor
                  ),
                },
              ],
            }}
          />
        </div>

        <div className="chart-box">
          <h3>💰 Fixos vs Variáveis</h3>
          <Pie
            data={{
              labels: ["Gastos Fixos", "Gastos Variáveis"],
              datasets: [
                {
                  data: [totalFixos, totalVariaveis],
                  backgroundColor: ["#667eea", "#764ba2"],
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="chart-box" style={{ marginTop: 30 }}>
        <h3>📈 Visão Geral do Orçamento</h3>
        <Bar
          data={{
            labels: ["Salário", "Fixos", "Variáveis", "Saldo"],
            datasets: [
              {
                data: [
                  salario,
                  totalFixos,
                  totalVariaveis,
                  saldo > 0 ? saldo : 0,
                ],
                backgroundColor: [
                  "#2ecc71",
                  "#e74c3c",
                  "#f39c12",
                  "#3498db",
                ],
              },
            ],
          }}
        />
      </div>
    </>
  );
}
