import { useState } from "react";

import "./App.css";
import logo from "./assets/logo.png";

interface infoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}
function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<infoProps>();

  function calcular(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const calculo = Number(alcoolInput) / Number(gasolinaInput);
    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa utilizar álcool!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    } else {
      setInfo({
        title: "Compensa utilizar Gasolina!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    }
  }

  function formatarMoeda(valor: number) {
    const valorFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return valorFormatado;
  }

  return (
    <div className="App">
      <main className="container">
        <img
          src={logo}
          className="logo"
          alt="Logo da calculadora de gasolina ou alcool"
        />
        <h1 className="title">Qual a melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            min="1"
            placeholder="4,90"
            required
            step="0.01"
            type="number"
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />
          <label htmlFor="alc">Gasolina (preço por litro):</label>
          <input
            className="input"
            min="1"
            placeholder="4,90"
            required
            step="0.01"
            type="number"
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />
          <button type="submit" className="button" value="Calcular">
            Calcular
          </button>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>

            <span>Álcool: {info.alcool}</span>
            <span>Gasolina: {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
