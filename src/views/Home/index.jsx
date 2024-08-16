import { Link as RouterLink } from 'react-router-dom';
import SimplePageLayout from "../../layout/SimplePageLayout"
import LoginForm from "../../components/Forms/LoginForm"

import { Box, Button, Typography } from "@mui/material"
import './style.scss'


function Home() {

    

    return (
        <SimplePageLayout >
            <Box className="c-home"
            >
                <Box className="c-home__left" sx={{display:'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" className="c-home__left-title" sx={{ textAlign: 'center'}} gutterBottom>
                        {`Bienvenue sur O'Network Votre Réseau Social d'Entreprise !`}
                    </Typography>
                    <Typography variant="body1" className="c-home__left-textfirst"  sx={{ textAlign: 'center'}} gutterBottom>
                        {`Prêt à transformer votre entreprise en un lieu d'échange, de collaboration et de succès ? Rejoignez O'Network dès maintenant et découvrez une plateforme où les idées prennent vie, où les projets se concrétisent, et où les opportunités se multiplient.`}
                    </Typography>
                    <Typography variant="body1" className="c-home__left-textsecond"  sx={{ textAlign: 'center'}} gutterBottom>
                        {`Créez votre compte dès aujourd'hui et plongez au cœur d'une communauté professionnelle dynamique, où votre organisation peut s'épanouir et atteindre de nouveaux sommets. Ensemble, construisons un avenir prospère pour votre entreprise !`}
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/new-organization"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Créer mon organisation !
                    </Button>
                </Box>
                <Box className="c-home__right" >
                    <LoginForm />
                </Box>
            </Box>
        </SimplePageLayout>
    )
}

export default Home;


