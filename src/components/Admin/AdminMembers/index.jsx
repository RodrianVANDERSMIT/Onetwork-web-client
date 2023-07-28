import InvitForm from '../../Forms/InvitForm';
import MemberCard from '../../Cards/MemberCard';
import {Box, Grid, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import { getUserOrganizationId } from '../../../redux/selectors/user';
import users from '../../../data/AppUser' // TODO delete when connected to the API

import './style.scss'


function AdminMembers () {

    const organizationId = useSelector(getUserOrganizationId)
    const allOrganizationMembers = users.filter(user => user.organizationId === organizationId && user.role.tag !== 'admin')
    return (
        <Box
            className="c-admin-members__group"
            sx={{
                maxWidth: 900,
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                px:'10px'
            }}
        >
            <Typography
                className="c-admin-members__title"
                component="h1"
                variant="h3"
                sx={{mt:3}}
            >
                Administration
            </Typography>
            <Typography
                className="c-admin-members__subtitle"
                component="h2"
                variant="h4"
                sx={{mt:2}}
            >
                Gestion des membres
            </Typography>
            <Box
                className="c-admin-members__container"
                sx={{
                    width: '100%',
                }}
            >
                <Box
                    className="c-admin-members__invit"
                    sx={{
                        width: '100%',
                    }}
                >
                    <InvitForm/>
                </Box>
                <Grid
                    className="c-admin-members__cards"
                    container spacing={2}
                >
                    {allOrganizationMembers.map(organizationMember => (
                        <Grid key={organizationMember.id} item xs={12} lg={6} >
                            <MemberCard {...organizationMember}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default AdminMembers