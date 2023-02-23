import logo from "./logo.svg";
import "./App.css";
import Calculator from "./main/Calculator.jsx";
import Draggable, { DraggableCore } from "react-draggable";

function App() {
  return (
    <Draggable>
      <div className="App">
        <Calculator />
      </div>
    </Draggable>
  );
}

export default App;
