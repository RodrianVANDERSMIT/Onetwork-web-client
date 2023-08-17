import { Avatar, Box, Typography } from "@mui/material";
import { getUser } from "../../../redux/selectors/user";
import { useSelector } from 'react-redux'

import './style.scss'
import Link from '@mui/material/Link';

function UserCard() {
    const userLogged = useSelector(getUser)

    return (
        <Box
            className= "c-user-card__group"
            sx= {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: '0.5em'
            }}
        >
            <Link href={`/${userLogged.organizationId}/user/${userLogged.id}`}>
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
            </Link>
            <Box
                className= "c-user-card__info"
                sx= {{
                    textAlign: 'center',
                    pb: 1
                }}
            >
                <Link href={`/${userLogged.organizationId}/user/${userLogged.id}`}>
                    <Typography
                        className= "c-user-card__identity"
                        variant= "body1"
                    >
                        {userLogged.name} {userLogged.surname}
                    </Typography>
                </Link>
                <Typography
                    className= "c-user-card__job"
                    variant= "body1"
                >
                    {userLogged.job}
                </Typography>
            </Box>
        </Box>
    );
}

export default UserCard