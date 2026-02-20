// HolaMundoConFuncion.jsx
import React from "react";

const HolaMundoConFuncion = () => {
  const escuela = "Tec";

  const obtenerSaludo = () => {
    return `Hola Mundo ${escuela}`;
  };

  return (
    <div>
      <h1>{obtenerSaludo()}</h1>
    </div>
  );
};

export default HolaMundoConFuncion;