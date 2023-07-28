import PropTypes from 'prop-types';
import {Avatar, Box, Button, Typography, Paper} from '@mui/material';
import { useForm } from "react-hook-form";
// import { useDispatch } from 'react-redux';
import './style.scss'

function MemberCard ({name, surname, job, profilePicture}) {
    console.log('carte de membre du club des winners')

    // const dispatch = useDispatch();

    const {
        // register, // TODO
        handleSubmit,
        // formState: { errors }  // TODO a voir si on affiche une erreur
    } = useForm();

    const onSubmit = (data) => {console.log(data)}

    return (
        <Paper
            className="c-member-card__group"
            component="form"
            noValidate
            elevation={3}
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
                    src={profilePicture}
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
                        {name} {surname}
                    </Typography>
                    <Typography
                        className="c-member-card__job"
                        variant="body1"
                    >
                        {job}
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
        </Paper>
    )
}

MemberCard.propTypes = {
    name: PropTypes.string,
    surname: PropTypes.string,
    job: PropTypes.string,
    profilePicture: PropTypes.string
};

export default MemberCard