import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { getIsLogged, getUserId, getUserOrganizationId } from '../../../redux/selectors/user';
import { logout } from '../../../redux/reducers/user';


import { Box, Divider, ListItemIcon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import UserCard from '../../Cards/UserCard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';


export default function MobileMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const organizationId = useSelector(getUserOrganizationId);
    const isLog = useSelector(getIsLogged);
    const userId = useSelector(getUserId);
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout()).unwrap()
        navigate('/')
    }

    return (
        <>
            {/* pour le menu de navigation(burger) qui s'affiche si on est sur les pages connectées en mobile */}
            {isLog && (
                <IconButton
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                    className="c-button-header_icon"
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
            )}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box className="c-box-avatar">
                    <UserCard />
                </Box>
                <Divider />
                <MenuItem component={Link} to={`/${organizationId}`} onClick={handleClose}> 
                    <ListItemIcon>
                        <ForumIcon /> 
                    </ListItemIcon>
                    {'Flux d\'activité'}
                </MenuItem>
                <MenuItem component={Link} to={`/${organizationId}/user/${userId}`} onClick={handleClose}>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                Mon profil
                </MenuItem>
                <MenuItem component={Link} to={`/${organizationId}/user/${userId}/edit`} onClick={handleClose}>
                    <ListItemIcon>
                        <ManageAccountsIcon/>
                    </ListItemIcon>
                Editer mon profil
                </MenuItem>
                <MenuItem component={Link} to={`/${organizationId}/admin/members`} onClick={handleClose}>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />
                    </ListItemIcon>
                Administration
                </MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleClose}>
                    <ListItemIcon>
                        <ContactMailIcon />
                    </ListItemIcon>
                Contact
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                Déconnexion
                </MenuItem>
            </Menu>
        </>
    );
}
