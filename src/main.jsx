import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {
      localStorage.getItem("isUserLoggedIn") === "true" ?
     
      <App/>: <Login/>
    }
  </StrictMode>,
)
