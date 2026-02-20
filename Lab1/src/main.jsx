import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hola from './Hola.jsx'
import Segundo from './Segundo.jsx'
import Tercer from './Tercer.jsx'
import Prueba from './Prueba.jsx'
import PruebaIA from './PruebaIA.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hola/>
    <Segundo/>
    <Tercer/>
    <Prueba/>
    <Prueba2/>
    <Prueba3/>
    <PruebaIA/>
  </StrictMode>,
)
