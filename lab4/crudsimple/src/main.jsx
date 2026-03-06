import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usuarios from './Usuarios.jsx'
import Empleados from './Empleados.jsx'
import { CrudTable } from './CrudTable.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Empleados />
    <CrudTable />
  </StrictMode>,
)
