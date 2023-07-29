import PropTypes from 'prop-types';
import {Avatar, Box, Button, Typography, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { updateMemberStatus } from '../../../redux/thunks/members'
import './style.scss'

function MemberCard ({id, name, surname, job, profilePicture, disabled}) {
    console.log('carte de membre du club des winners')
    console.log(id, name, surname, job)

    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(disabled)
    console.log(isDisabled)
    const {
        handleSubmit
    } = useForm();

    const onSubmit = () => {
        const updatedDisabled = !isDisabled
        dispatch(updateMemberStatus({ id, disabled: isDisabled }))
        setIsDisabled(updatedDisabled)
    }

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
                type="submit"
            >
                {isDisabled ? 'Débloquer' : 'Bloquer'}
            </Button>
        </Paper>
    )
}

MemberCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    job: PropTypes.string,
    profilePicture: PropTypes.string,
    disabled: PropTypes.bool
};

export default MemberCard