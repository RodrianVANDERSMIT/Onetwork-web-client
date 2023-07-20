import PropTypes from "prop-types"
import HeaderButton from "./HeaderButton";
import Logo from "./Logo";
import { AppBar, Toolbar } from '@mui/material'
import './style.scss'

//TODO si l'utilisateur est sur les pages en connecter , ne plus afficher le bouton retour


const Header = ({className}) => {
    
    return (    
        <AppBar className={className} >
            <Toolbar className="c-header__toolbar" >
                <Logo />
                <HeaderButton />
            </Toolbar>
        </AppBar>       
    );
};

Header.propTypes = {
    className: PropTypes.string,
};   

export default Header;
