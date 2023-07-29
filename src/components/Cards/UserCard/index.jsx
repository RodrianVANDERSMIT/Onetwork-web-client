import { Avatar, Box, Typography } from "@mui/material";
import { getUser } from "../../../redux/selectors/user";
import { useSelector } from 'react-redux'

import './style.scss'

function UserCard() {
    const userLogged = useSelector(getUser)

    return (
        <Box
            className= "c-user-card__group"
            sx= {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '170px',
                height:'170px'
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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
    );
}

export default UserCard