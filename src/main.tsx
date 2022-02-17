import React from 'react'
import ReactDOM from 'react-dom'
import "./styles/global.scss"
import App from './App'
import { AuthProvider } from './contexts/auth'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
