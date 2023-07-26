import PropTypes from "prop-types"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Grid, Box } from "@mui/material"
import './style.scss'



const ErrorLayout = () => {
    return (
        <Box>        
            <Header/>
            <Footer/>
        </Box>              
            
    )
}


ErrorLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorLayout