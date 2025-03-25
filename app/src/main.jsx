import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Single from './components/singleCard/Single.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <App />
  </StrictMode>,
)
