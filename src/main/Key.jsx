import React from "react";
import style from "./Key.css";

export default function Key({ label, id, color, func }) {
  return (
    <div
      className="keyContainer"
      id={id}
      style={{ backgroundColor: color }}
      onClick={() => func(label)}
    >
      <span>{label}</span>
    </div>
  );
}
