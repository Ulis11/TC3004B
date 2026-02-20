import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hola from './Hola.jsx'
import Segundo from './Segundo.jsx'
import Tercer from './Tercer.jsx'
import Prueba from './Prueba.jsx'
import Prueba2 from './Prueba2.jsx'
import Prueba3 from './Prueba3.jsx'
import PruebaIA from './PruebaIA.jsx'
import PruebaIA2 from './PruebaIA2.jsx'
import PruebaIA3 from './PruebaIA3.jsx'
import FetchAPI from './FetchAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Lab 1 */}
    <Hola/>
    <Segundo/>
    <Tercer/>
    
    {/* Pruebas */}
    <Prueba/>
    <Prueba2/>
    <Prueba3/>

    {/* Pruebas IA */}
    <PruebaIA/>
    <PruebaIA2/>
    <PruebaIA3/>

    {/* Fetch API */}
    <FetchAPI/>
  </StrictMode>,
)
