import React from 'react'
import {bancos} from '../../../../lab1/src/assets/bancos.js'

function Tercer() {
  return (
    <div>
        <h1>Lista de Bancos Internacionales</h1>
        <ul style={{listStyle: "none"}}>
            {bancos.map((b) => (
            <li key={b.id}>
                {b.id} — {b.name} — {b.country}
            </li>
            ))} 
        </ul>
    </div>
  )
}

export default Tercer