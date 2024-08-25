import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HeaderProvider } from './context/header.jsx'
import { UserDataProvider } from './context/auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserDataProvider>
    <HeaderProvider>
    <App />
    </HeaderProvider>
    </UserDataProvider>
  </React.StrictMode>,
)
