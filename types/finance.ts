export interface Gasto {
  nome: string;
  valor: number;
  categoria: string;
}

export interface FinanceData {
  salario: number;
  gastosFixos: Gasto[];
  gastosVariaveis: Gasto[];
}
