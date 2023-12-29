
import {useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserId, getIsAdmin, getUserOrganizationId } from "../../../redux/selectors/user"
import {logout}  from "../../../redux/reducers/user"
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';

const DesktopMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const organizationId = useSelector(getUserOrganizationId);
    const userId = useSelector(getUserId);
    const isAdmin = useSelector(getIsAdmin);

    const handleLogout = async () => {
        await dispatch(logout()).unwrap()
        navigate('/')
    }

    

    const data = [
        { text: "Flux d'activité", icon: <ForumIcon />, route: `/${organizationId}`, show: true },
        { text: 'Mon profil', icon: <PersonIcon/>, route: `/${organizationId}/user/${userId}`, show: true},
        { text: 'Editer mon profil', icon: <ManageAccountsIcon/>, route: `/${organizationId}/user/${userId}/edit`, show: true},
        { text: 'Administration', icon: <AdminPanelSettingsIcon />, route: `/${organizationId}/admin/members`, show: isAdmin },
        { text: 'Contact', icon: <ContactMailIcon />, route: "/about", show: true },
    
    ]

    return (
    
        <List> 
            <Divider/>
            {data.map(({ text, icon, route, show }) =>
                show &&
                    <ListItem key={text}
                        component={Link}
                        to={route}
                        disablePadding
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ListItemButton>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
            )}
            <ListItem key="Déconnexion" 
                disablePadding 
                onClick={handleLogout}
                style={{ textDecoration: 'none', color: 'inherit' }} 
            >
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default DesktopMenu;
