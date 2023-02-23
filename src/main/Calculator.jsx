import React, { useEffect, useState } from "react";
import "./Calculator.css";

import Key from "./Key";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstElem, setFirstElem] = useState("0");
  const [scndElem, setScndElem] = useState("0");
  const [operator, setOperator] = useState();
  const [state, setState] = useState(false);
  const [calcCoord, setCalcCoord] = useState();

  useEffect(() => resizeFont(), [displayValue]);

  function resizeFont() {
    const displayNumbers = document.querySelector(".displayValue");

    if (displayValue.length < 8) {
      displayNumbers.setAttribute("style", "font-size: 5rem");
    }
    if (displayValue.length > 8 && displayValue.length <= 10) {
      displayNumbers.setAttribute("style", "font-size: 4rem");
    }
    if (displayValue.length > 10) {
      displayNumbers.setAttribute("style", "font-size: 3rem");
    }
  }

  function calculate() {
    const formate = (elem) => {
      const elemString = elem.toString();
      return elemString.includes(",")
        ? elemString.replace(",", ".")
        : elemString;
    };

    let resultado = "";

    if (operator === "+") {
      try {
        resultado =
          parseFloat(formate(firstElem)) + parseFloat(formate(scndElem));
      } catch (e) {
        resultado = "Erro";
      }
    } else if (operator === "-") {
      try {
        resultado = (
          parseFloat(formate(firstElem)) - parseFloat(formate(scndElem))
        ).toString();
      } catch {
        resultado = "Erro";
      }
    } else if (operator === "*") {
      try {
        resultado = (
          parseFloat(formate(firstElem)) * parseFloat(formate(scndElem))
        ).toString();
      } catch {
        resultado = "Erro";
      }
    } else if (operator === "/") {
      try {
        resultado = (
          parseFloat(formate(firstElem)) / parseFloat(formate(scndElem))
        ).toString();
      } catch {
        resultado = "Erro";
      }
    }
    console.log(
      `${formate(firstElem)} ${operator} ${formate(scndElem)} = ${resultado}`
    );
    setDisplayValue(resultado);
    setFirstElem(resultado);
    setState(true);

    return resultado;
  }

  function displayChange(value) {
    const operators = ["*", "/", "-", "+"];

    if (displayValue === "Erro" || displayValue === "NaN") {
      return;
    }

    if (value === "=") {
      if (operator) {
        calculate();
      }
      return;
    }

    if (value === ",") {
      !displayValue.includes(",") && setDisplayValue(displayValue + ",");
    } else if (operators.includes(value)) {
      if (!firstElem) {
        setFirstElem(displayValue);
        setOperator(value);
        setDisplayValue("0");
      } else if (!operator) {
        setOperator(value);
        setDisplayValue("0");
      } else if (firstElem && operator && scndElem && !state) {
        calculate();
        setScndElem("0");
      } else if (state) {
        setState(false);
        setOperator(value);
        setScndElem("0");
      }
    } else {
      if (displayValue.length >= 14) {
        return;
      }
      if (state) {
        setDisplayValue(value);
        setScndElem(value);
        setState(false);
        return;
      }

      if (firstElem === "0") {
        setDisplayValue(value);
        setFirstElem(value);
      } else if (!operator) {
        setDisplayValue(displayValue + value);
        setFirstElem(displayValue + value);
      } else if (scndElem === "0") {
        setDisplayValue(value);
        setScndElem(value);
      } else {
        setDisplayValue(displayValue + value);
        setScndElem(displayValue + value);
      }
    }
  }

  function allClean() {
    setDisplayValue("0");
    setFirstElem("0");
    setScndElem("0");
    setOperator();
    setState(false);
  }

  function backSpace() {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
      setFirstElem(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
      setFirstElem("0");
    }
  }

  return (
    <>
        <div className="container">
          <div className="displayContainer">
            <div className="display">
              <span className="displayOp">{operator}</span>
              <span className="displayValue">{displayValue}</span>
            </div>
          </div>
          <div className="keysContainer">
            <Key label="AC" color="#ff4446" func={allClean} />
            <Key label="BS" func={backSpace} />
            <Key label="*" func={displayChange} />
            <Key label="/" func={displayChange} />

            <Key label="7" func={displayChange} />
            <Key label="8" func={displayChange} />
            <Key label="9" func={displayChange} />
            <Key label="-" func={displayChange} />

            <Key label="4" func={displayChange} />
            <Key label="5" func={displayChange} />
            <Key label="6" func={displayChange} />
            <Key label="+" func={displayChange} />

            <Key label="1" func={displayChange} />
            <Key label="2" func={displayChange} />
            <Key label="3" func={displayChange} />

            <Key label="0" func={displayChange} id="zero" />
            <Key label="," func={displayChange} />

            <Key label="=" color="#f89320" func={displayChange} id="equal" />
          </div>
        </div>
        {/* <div className="infos">
          <h3>State: {state ? "true" : "false"}</h3>
          <h3>Coords: {calcCoord}</h3>
          <h3>DisplayValue: {displayValue}</h3>
          <h3>PrimeiroElm: {firstElem}</h3>
          <h3>Operador: {operator}</h3>
          <h3>SegundoElm: {scndElem}</h3>
        </div> */}
    </>
  );
}
