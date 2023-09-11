import { Avatar, Box, Typography } from "@mui/material";
import { getUser } from "../../../redux/selectors/user";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material'

import './style.scss'

function UserCard() {
    const userLogged = useSelector(getUser)

    return (
        <MuiLink 
            component={Link}
            to={`/${userLogged.organization.id}/user/${userLogged.id}`}
        >
            <Box
                className= "c-user-card__group"
                sx= {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '180px',
                    margin: 'auto',
                    padding: '0.5em'
                }}
            >
                <Avatar
                    className= "c-user-card__avatar"
                    src= {userLogged.profilePicture}
                    alt= {userLogged.name + userLogged.surname}
                    sx= {{
                        width: '100px',
                        height: '100px',
                        my: 1
                    }}
                />
                <Box
                    className= "c-user-card__info"
                    sx= {{
                        textAlign: 'center',
                        pb: 1
                    }}
                >
                    <Typography
                        className= "c-user-card__identity"
                        variant= "body1"
                    >
                        {userLogged.name} {userLogged.surname}
                    </Typography>
                    <Typography
                        className= "c-user-card__job"
                        variant= "body1"
                    >
                        {userLogged.job}
                    </Typography>
                </Box>
            </Box>
        </MuiLink>
    );
}

export default UserCard
