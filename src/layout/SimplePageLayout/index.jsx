import PropTypes from "prop-types"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Grid, Box } from "@mui/material"
import './style.scss'

const SimplePageLayout = ({ children }) => {
    return (
        <Grid>
            <Box className="c-box-main">
                <Header />
                {children}
                <Footer />
            </Box>   
        </Grid>
    )
}

SimplePageLayout.propTypes = {
    children: PropTypes.node,
};

export default SimplePageLayout