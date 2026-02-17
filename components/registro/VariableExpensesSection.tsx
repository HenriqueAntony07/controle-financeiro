"use client";

import { useState } from "react";
import { Gasto } from "@/types/finance";
import { categoriasInfo } from "@/hooks/useFinance";

interface Props {
  gastos: Gasto[];
  setGastos: (g: Gasto[]) => void;
}

export default function VariableExpensesSection({ gastos, setGastos }: Props) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [categoria, setCategoria] = useState("alimentacao");

  const adicionar = () => {
    if (!nome || valor <= 0) return;
    setGastos([...gastos, { nome, valor, categoria }]);
    setNome("");
    setValor(0);
  };

  const remover = (index: number) => {
    setGastos(gastos.filter((_, i) => i !== index));
  };

  return (
    <div className="section">
      <h2>🛒 Gastos Variáveis</h2>

      <div className="input-group">
        <label>Descrição:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Categoria:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {Object.keys(categoriasInfo).map((key) => (
            <option key={key} value={key}>
              {categoriasInfo[key].icon} {categoriasInfo[key].nome}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Valor:</label>
        <input
          type="number"
          value={valor || ""}
          step="0.01"
          min="0"
          onChange={(e) => setValor(Number(e.target.value))}
        />
      </div>

      <button className="btn-add" onClick={adicionar}>
        ➕ Adicionar Gasto Variável
      </button>

      {gastos.map((gasto, index) => (
        <div key={index} className="expense-item">
          <div>
            <strong>{gasto.nome}</strong>
            <div className={`category-badge cat-${gasto.categoria}`}>
              {categoriasInfo[gasto.categoria].icon}{" "}
              {categoriasInfo[gasto.categoria].nome}
            </div>
          </div>

          <span className="expense-value">
            R$ {gasto.valor.toFixed(2)}
          </span>

          <button className="btn-remove" onClick={() => remover(index)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
