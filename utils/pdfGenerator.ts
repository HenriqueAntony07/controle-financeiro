import { jsPDF } from "jspdf";

export function gerarPDF({
  salario,
  totalGastos,
  saldo,
}: {
  salario: number;
  totalGastos: number;
  saldo: number;
}) {
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text("Relatório Financeiro", 20, 20);
  pdf.setFontSize(12);
  pdf.text(`Salário: R$ ${salario.toFixed(2)}`, 20, 40);
  pdf.text(`Total Gastos: R$ ${totalGastos.toFixed(2)}`, 20, 50);
  pdf.text(`Saldo: R$ ${saldo.toFixed(2)}`, 20, 60);
  pdf.save("relatorio-financeiro.pdf");
}
