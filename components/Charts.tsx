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
import { Doughnut, Bar } from "react-chartjs-2";

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
  fixos: number;
  variaveis: number;
}

export default function Charts({ salario, fixos, variaveis }: Props) {
  return (
    <div style={{ maxWidth: 600, marginTop: 40 }}>
      <Doughnut
        data={{
          labels: ["Fixos", "Variáveis"],
          datasets: [
            {
              data: [fixos, variaveis],
            },
          ],
        }}
      />

      <Bar
        data={{
          labels: ["Salário", "Fixos", "Variáveis"],
          datasets: [
            {
              label: "Valores",
              data: [salario, fixos, variaveis],
            },
          ],
        }}
      />
    </div>
  );
}
