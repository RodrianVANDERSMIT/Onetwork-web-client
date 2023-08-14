
import {useDispatch, useSelector } from 'react-redux'
import { Link,  } from 'react-router-dom' 
import { getUserId, getUserOrganizationId } from "../../../redux/selectors/user"
import {logout}  from "../../../redux/reducers/user"
import { cleanOrganizationState } from "../../../redux/reducers/organization"
import { cleanMembersState } from "../../../redux/reducers/members"
import { cleanFeedState } from "../../../redux/reducers/feed"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';

const DesktopMenu = () => {

    const dispatch = useDispatch();
    const organizationId = useSelector(getUserOrganizationId);
    const userId = useSelector(getUserId);

    const handleLogout = () => {
        
        dispatch(cleanOrganizationState());
        dispatch(cleanMembersState());
        dispatch(cleanFeedState());
        dispatch(logout());
    }

    

    const data = [
        { text: "Flux d'activité", index: <ForumIcon />, route: `/${organizationId}` },
        { text: 'Mon profil', index: <PersonIcon/>, route: `/${organizationId}/user/${userId}`},
        { text: 'Editer mon profil', index: <ManageAccountsIcon/>, route: `/${organizationId}/user/${userId}/edit`},
        { text: 'Administration', index: <AdminPanelSettingsIcon />, route: `/${organizationId}/admin/members`},
        { text: 'Contact', index: <ContactMailIcon />, route: "/about" },
    
    ]

    return (
        <List>
            {data.map(({ text, index, route }) => (
                <ListItem key={text} 
                    component={Link} 
                    to={route} 
                    disablePadding    
                    style={{ textDecoration: 'none', color: 'inherit' }} 
                >
                    <ListItemButton>
                        <ListItemIcon>{index}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
            <ListItem key="Déconnexion" 
                disablePadding 
                component={Link} 
                to="/" 
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