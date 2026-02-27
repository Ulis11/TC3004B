import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Message from './lab3/components/Message.jsx'
import SimpleForm from './lab3/components/SimpleForm.jsx';
import Focus from './lab3/components/Focus.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Focus/>
  </StrictMode>,
)
