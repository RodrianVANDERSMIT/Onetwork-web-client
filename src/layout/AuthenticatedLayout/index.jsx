import PropTypes from "prop-types"
import { Link } from 'react-router-dom' 
import {useDispatch, } from 'react-redux'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BasicCard from '../../components/BasicCard'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Grid, Toolbar, Divider, Box, Drawer } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ForumIcon from '@mui/icons-material/Forum'
import './style.scss'
import {logout}  from "../../redux/reducers/user"

const drawerWidth = 240;

const data = [
    { text: "Flux d'activité", index: <ForumIcon />, route: "/:organization-id"},
    { text: 'Editer mon profil', index: <ManageAccountsIcon/>, route: "/:organization-id/user/:user-id/edit"},
    { text: 'Administration', index: <AdminPanelSettingsIcon />, route: "/:organization-id/admin/members" },
    { text: 'Contact', index: <ContactMailIcon />, route: "/about" },
    // { text: 'Déconnexion', index: <LogoutIcon />, route: "/" },
]

function ActivityFeed({children}) {

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Grid container>
            <Box sx={{ display: 'flex' }}>
                <Header/>
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
                                component={Link} to="/"
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
                <Box 
                    component="main"
                    className='c-box-main' 
                    sx={{ flexGrow: 1, p: 0 }}
                >
                    <Toolbar/>
                            
                    {children}
                </Box>
            </Box>
            <Grid  xs={12} md={12}>
                <Footer/>
            </Grid> 
        </Grid>     
    )
}

ActivityFeed.propTypes = {
    children: PropTypes.node, 
};

export default ActivityFeed