import InvitForm from '../../Forms/InvitForm';
import MemberCard from '../../Cards/MemberCard';
import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { getUserOrganizationId } from '../../../redux/selectors/user';

import './style.scss'

function AdminMembers () {
    const [members, setMembers] = useState([])
    const organizationId = useSelector(getUserOrganizationId)
    const [isLoading, setIsLoading] = useState(false)

    const setMember = member => {
        setMembers(members.map(m => m.id === member.id ? member : m))
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true)

            try {
                let { data: members } = await api(`/organizations/${organizationId}/users`)

                //filter the organization member withn't the admin
                members = members.filter(member => member.role && member.role.tag !=="admin")
                setMembers(members)
            }
            catch (error) {
                // TODO: instead of console logs, errors must be displayed directly to user
                if (error.response.status === 404) {
                    console.error({ status: error.response.status, message: "Il n'y a aucun membre dans cette organisation" });
                }
                else {
                    console.error({ status: error.response.status, message: "Une erreur s'est produite" });
                }
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [organizationId, setMembers])

    return (
        <Box
            className="c-admin-members"
            sx={{
                maxWidth: 900,
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                px:'10px'
            }}
        >
            <Typography 
                id="back-to-top-anchor"
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
                    {members.map(member => (
                        <Grid key={member.id} item xs={12} lg={6} >
                            <MemberCard {...member} setMember={setMember} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box className="c-admin-members__loader">
                {isLoading ? <CircularProgress/> : null}
            </Box>
        </Box>
    )
}

export default AdminMembers
