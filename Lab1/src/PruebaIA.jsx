import React from "react";
import {bancos} from './assets/bancos.js'

const PruebaIA = () => {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Listado de Bancos Internacionales</h1>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {bancos.map((banco) => (
          <li
            key={banco.id}
            style={{
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <p><strong>ID:</strong> {banco.id}</p>
            <p><strong>Nombre:</strong> {banco.name}</p>
            <p><strong>País:</strong> {banco.country}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PruebaIA;