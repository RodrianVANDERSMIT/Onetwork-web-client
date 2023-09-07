import PropTypes from 'prop-types'
import Router from '../Router'

function App() {
    return (
        <Router/>
    )
}


App.propTypes = {
    children: PropTypes.node,
}

export default App
