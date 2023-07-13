import Footer from "../../Footer"
import Header from "../../Header"
import { Grid, Box } from "@mui/material"
import './style.scss'


const DoublePage = () => {
    return(
        <Grid container >
            <Grid  md={6} lg={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Box>
                    <img src="../../../../public/austin-distel-wD1LRb9OeEo-unsplash.jpg" alt="tranquillou les devs!"></img>
                </Box>
            </Grid>
            <Grid  xs={12} sm={12} md={6}>
                <Box>
                    <Header/>
                </Box>
            </Grid>
            <Grid  xs={12} md={12}>
                <Footer/>
            </Grid>
        </Grid>
    )
}

export default DoublePage