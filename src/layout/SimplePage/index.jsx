import PropTypes from "prop-types"

import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Grid } from "@mui/material"

import './style.scss'

const SimplePage = ({ children }) => {
    return (
        <Grid>
            <Header />
            {children}
            <Footer />
        </Grid>
    )
}

SimplePage.propTypes = {
    children: PropTypes.node,
};

export default SimplePage