import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import { store } from './store/store'
import { AuthProvider } from './contexts/AuthContext'

// Import global styles
import 'styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@mui/material/styles'

// Configure axios
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

// Enable immer MapSet
import { enableMapSet } from 'immer'
enableMapSet()

/* eslint-disable */
if (import.meta.env.PROD) {
  console.log = function () {}
  console.warn = function () {}
  console.error = function () {}
}
/* eslint-enable */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)
