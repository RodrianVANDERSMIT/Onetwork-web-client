import React from 'react'
import ReactDOM from 'react-dom/client'


import App from './components/App/App'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>

        <CssBaseline />
        <App />

    </React.Fragment>
    
)
