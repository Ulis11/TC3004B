import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Focus from './lab3/components/Focus';
import { ExpertApp } from './api-GIF/ExpertApp';
import { FormularioLogin } from './lab3/components/FormularioLogin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormularioLogin />
  </StrictMode>,
)
