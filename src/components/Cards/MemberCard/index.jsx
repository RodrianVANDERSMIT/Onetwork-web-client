import {Avatar, Box, Button, Typography} from '@mui/material';
import { useForm } from "react-hook-form";
// import { useDispatch } from 'react-redux';
import './style.scss'

function MemberCard () {
    console.log('carte de membre du club des winners')

    // const dispatch = useDispatch();

    const {
        // register, // TODO Inutile en theorie
        handleSubmit,
        formState: { errors }  // TODO a voir si on affiche une erreur
    } = useForm();

    const onSubmit = (data) => {console.log(data)}

    return (
        <Box
            className="c-member-card__group"
            component="form"
            noValidate
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Box
                className="c-member-card__profil"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    className="c-member-card__avatar"
                    src="https://randomuser.me/api/portraits/women/33.jpg"
                    sx={{
                        width: 80,
                        height: 80,
                        m: 2
                    }}
                />
                <Box
                    className="c-member-card__member"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography 
                        className="c-member-card__identity"
                        variant="body1"
                        sx={{mb:0.5}}
                    >
                        Prénom Nom
                    </Typography>
                    <Typography
                        className="c-member-card__job"
                        variant="body1"
                    >
                        job
                    </Typography>
                </Box>
            </Box>
            <Button
                className="c-member-card__button"
                variant="outlined"
                sx={{m:2}}
                onClick={handleSubmit}
            >
                Bloquer
            </Button>
        </Box>
    )
}

export default MemberCard