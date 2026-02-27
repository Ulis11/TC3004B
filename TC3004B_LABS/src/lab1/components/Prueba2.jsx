import React from 'react'

function Prueba2() {
    const saludo = "Hola Mundo Tec desde variable"

    const mostrarSaludo = () => {
        return('Saludando desde funcion')
    }

    return (
    <div>
        {saludo}
        <br/>
        {mostrarSaludo()}
        <br/>
    </div>
  )
}

export default Prueba2