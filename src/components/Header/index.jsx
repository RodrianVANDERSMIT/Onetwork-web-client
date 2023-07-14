import HeaderBtn from "./HeaderBtn";
import Logo from "./Logo";
import { AppBar, Box, Toolbar } from '@mui/material'
import './style.scss'

//TODO si l'utilisateur est sur les pages en connecter , ne plus afficher le bouton retour
function Header() {
    return (
        <Box>
            <AppBar className="c-header" sx={{ height: '10vh' }} position="static">
                <Toolbar className="c-header box" >
                    <Logo />
                    <HeaderBtn />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header
