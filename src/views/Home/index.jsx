import SimplePageLayout from "../../layout/SimplePageLayout"
import LoginForm from "../../components/Forms/LoginForm"
import { Link as RouterLink } from 'react-router-dom';

import { Button } from "@mui/material"
import './style.scss'


function Home() {


    return (
        <SimplePageLayout>
            <div className= "c-home">
                <div className="c-home__left">
                    <h2 className = "c-home__left-title">{`Bienvenue sur O'Network - Votre Réseau Social d'Entreprise !`}</h2>
                    <p className= "C-home__left-textfirst">{`Prêt à transformer votre entreprise en un lieu d'échange, de collaboration et de succès ? Rejoignez O'Network dès maintenant et découvrez une plateforme où les idées prennent vie, où les projets se concrétisent, et où les opportunités se multiplient.`}</p>
                    <p className= "C-home__left-textsecond">{`Créez votre compte dès aujourd'hui et plongez au cœur d'une communauté professionnelle dynamique, où votre organisation peut s'épanouir et atteindre de nouveaux sommets. Ensemble, construisons un avenir prospère pour votre entreprise !`}</p>
                    <Button component={RouterLink} to="/new-organization" sx={{ m:1,}} className="c-home__left-button" variant="contained" >Créer mon organisation!</Button>
                    
                </div>
                <div className="c-home__right">
                    <LoginForm />
                </div>
            </div>
        </SimplePageLayout>
    )
}

export default Home
