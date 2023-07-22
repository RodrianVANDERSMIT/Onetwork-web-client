import PropTypes from "prop-types"
import  { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { logout } from "../../../redux/reducers/user"
import { getIsLogged } from "../../../redux/selectors/user"
import BasicButton from '../../Buttons/BasicButton'
import { HashLink } from 'react-router-hash-link';


import { Box, Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Menu, MenuItem} from '@mui/material'
import BasicCard from '../../BasicCard'

import './style.scss'



export default function HeaderButton() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const location = useLocation();
    const isLog = useSelector(getIsLogged)
    const currentPath = location.pathname;
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
    }
    



    return (
        <Box className='c-button-header' sx={{ flexGrow: 1 }}>
            
                
            { (isLog && currentPath === '/about') || (currentPath === '/sign-up' || currentPath === '/:organization-id/user/:user-id/edit' || currentPath === '/about') ? (
                <BasicButton
                    sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}
                    className='c-button-header_btn'
                    variant="outlined"
                    name="Retour à l'accueil"
                    component={Link}
                    route={isLog ? "/:organization-id" : "/"}
                />
            ) : null}
            {currentPath ==='/' && (
                <BasicButton sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} 
                    className='c-button-header_btn'
                    variant="outlined"
                    name="Déjà un compte ?"
                    component={HashLink}
                    route="#connexion"
                />)}
            {currentPath ==='/sign-up'|| currentPath === '/new-organization' && (
                <BasicButton sx={{ display: { xs: 'block', sm: 'block', md: 'block' } }} 
                    className='c-button-header_btn'
                    variant="outlined"
                    name="Retour à l'accueil"
                    component={Link}
                    route="/"
                />)}
                
            { (isLog ) ? (
                <IconButton sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}
                    className='c-button-header_icon'
                    edge="start"
                    aria-label="menu"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
            ) : null}
                
            <Menu 
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box className='c-box-avatar' >
                    <BasicCard className="c-card__column"/>
                </Box>
                <Divider/>
                <MenuItem component={Link} to="/:organization-id"
                    onClick={handleClose}>{"Flux d'activité"}</MenuItem>
                <MenuItem component={Link} to="/:organization-id/user/:user-id"
                    onClick={handleClose}>Mon profil</MenuItem>
                <MenuItem component={Link} to="/:organization-id/user/:user-id/edit"
                    onClick={handleClose}>Editer mon profil</MenuItem>
                <MenuItem component={Link} to="/:organization-id/admin/members"
                    onClick={handleClose}>Administration</MenuItem>
                <MenuItem component={Link} to="/about"
                    onClick={handleClose}>Contact</MenuItem>
                <MenuItem component={Link} to="/"
                    onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
            
        </Box>
    );
}

HeaderButton.propTypes = {
    open: PropTypes.func,  
};