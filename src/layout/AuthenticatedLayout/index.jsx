import PropTypes from "prop-types"
import { Link, useNavigate } from 'react-router-dom' 
import {useDispatch, useSelector } from 'react-redux'
import  { useEffect } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BasicCard from '../../components/BasicCard'
import { getIsLogged, getUserId, getUserOrganizationId } from "../../redux/selectors/user"
import {logout}  from "../../redux/reducers/user"

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Toolbar, Divider, Box, Drawer } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ForumIcon from '@mui/icons-material/Forum'
import PersonIcon from '@mui/icons-material/Person';
import './style.scss'
import { cleanOrganizationState } from "../../redux/reducers/organization"


const drawerWidth = 240;





function AuthenticatedLayout({children}) {

    const dispatch = useDispatch();
    const isLog = useSelector(getIsLogged);
    const navigate = useNavigate();
    const organizationId = useSelector(getUserOrganizationId);
    const userId = useSelector(getUserId);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(cleanOrganizationState());
    }

    const data = [
        { text: "Flux d'activité", index: <ForumIcon />, route: `/${organizationId}` },
        { text: 'Mon profil', index: <PersonIcon/>, route: `/${organizationId}/user/${userId}`},
        { text: 'Editer mon profil', index: <ManageAccountsIcon/>, route: `/${organizationId}/user/${userId}/edit`},
        { text: 'Administration', index: <AdminPanelSettingsIcon />, route: `/${organizationId}/admin/members`},
        { text: 'Contact', index: <ContactMailIcon />, route: "/about" },
    
    ]
    useEffect(() => {
        if (!isLog) {
            navigate('/');  
        }
    }, [isLog, navigate]);

    return (
        
        <Box>
            <Header className='c-header__authenticated'/>
            <Box 
                component="main"
                className='c-main__authenticated' 
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block', md: 'block' },  
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <Box className='c-box-avatar'>
                                <BasicCard className="c-card__column"/>
                            </Box>
                            <Divider/>
                            {data.map(({text, index, route}) => (
                                <ListItem 
                                    key={text}
                                    component={Link} to={route} 
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}  
                            <ListItem
                                key={"Déconnexion"}
                                disablePadding
                                component={Link}
                                to = "/"
                                onClick={handleLogout}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Déconnexion"} />
                                </ListItemButton>
                            </ListItem>
                        </List> 
                    </Box>
                </Drawer>
            
                <Box  className="c-box-children">
                    {children}
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

AuthenticatedLayout.propTypes = {
    children: PropTypes.node, 
};

export default AuthenticatedLayout
