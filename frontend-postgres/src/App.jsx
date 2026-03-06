import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountryList from './components/CountryList'
import EmployeeManager from './components/EmployeeManager'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'white' }}>Administrador de Empleados</h1>
      </header>
      <main>
        <CountryList />
        <EmployeeManager />
      </main>
      <footer>
        <p>CRUD de Empleados © 2026</p>
      </footer>
    </div>
  )
}
export default App