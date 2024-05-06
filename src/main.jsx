import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClicksProvider } from './context/ClicksContext.jsx'
import Footer from './components/Footer.jsx'
import {UserProvider} from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(  
  
  <React.StrictMode>

      <UserProvider> {/* Agregando otro proveedor */}
          <ClicksProvider>
              <App />
              <Footer />
          </ClicksProvider>
      </UserProvider>

  </React.StrictMode>,
)
