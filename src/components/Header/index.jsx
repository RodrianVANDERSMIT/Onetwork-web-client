import HeaderButton from "./HeaderButton";
import Logo from "./Logo";
import { AppBar, Box, Toolbar } from '@mui/material'
import './style.scss'

//TODO si l'utilisateur est sur les pages en connecter , ne plus afficher le bouton retour
function Header() {
    return (
        <Box className="c-header">
            <AppBar className="c-header__appbar" >
                <Toolbar className="c-header__toolbar" >
                    <Logo />
                    <HeaderButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header
