// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
import AuthContext from './Context/AuthContext.jsx'
// import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<AuthContext>
    <App />
</AuthContext>
)
