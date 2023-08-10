import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'

import App from './components/App/App'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>
    </BrowserRouter>

)
