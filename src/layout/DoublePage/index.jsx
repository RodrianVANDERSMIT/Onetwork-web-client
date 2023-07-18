import PropTypes from "prop-types"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Grid, Box } from "@mui/material"
import './style.scss'



const DoublePage = ({ children }) => {
    return (
        <Grid container >
            <Grid md={6} lg={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Box className="c-box-img">
                    <img 
                        className="c-box-img__left"
                        src="../../../../public/austin-distel-wD1LRb9OeEo-unsplash.jpg" alt="tranquillou les devs!"></img>
                </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
                <Box className="c-box-main"> 
                    <Header />   
                    {children}
                </Box>     
            </Grid>
            <Grid xs={12} md={12}>
                <Footer />
            </Grid>
        </Grid>
    )
}


DoublePage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DoublePage