import { Avatar, Box, Typography } from "@mui/material";


import './style.scss'

function SelectedUserCard(author) {
    console.log(author)

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
                src= {author.profilePicture}
                alt= {author.name + author.surname}
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
                    {author.name} {author.surname}
                </Typography>
                <Typography
                    className= "c-user-card__job"
                    variant= "body1"
                >
                    {author.job}
                </Typography>
            </Box>
        </Box>
    );
}

export default SelectedUserCard