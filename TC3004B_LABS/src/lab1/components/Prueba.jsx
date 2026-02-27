import React from 'react'
import {bancos} from '../../../../lab1/src/assets/bancos.js'

function Prueba() {
  return (
    <div>
        <h1>Lista de Bancos Internacionales</h1>
        <ul>
        {bancos.map((b) => (
            <li key={b.code}>
            {b.id} — {b.name} — {b.country}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Prueba