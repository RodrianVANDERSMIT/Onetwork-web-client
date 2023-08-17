import PropTypes from 'prop-types';
import {Avatar, Box, Button, Typography, Paper} from '@mui/material';
import { useDispatch, } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateMemberStatus } from '../../../redux/thunks/members'
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss'
import { Link } from 'react-router-dom';

function MemberCard ({id, organizationId, name, surname, job, profilePicture, disabled, isLoading}) {

    const dispatch = useDispatch();
    const { handleSubmit } = useForm();

    const onSubmit = () => {
        dispatch(updateMemberStatus({ id, disabled: !disabled }));
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
            
                <Link to={`/${organizationId}/user/${id}`}>
                    <Avatar
                        className="c-member-card__avatar"
                        src={profilePicture}
                        sx={{
                            width: 80,
                            height: 80,
                            m: 2
                        }}
                    />
                </Link>
                <Box
                    className="c-member-card__member"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Link to={`/${organizationId}/user/${id}`}>
                        <Typography 
                            className="c-member-card__identity"
                            variant="body1"
                            sx={{mb:0.5}}
                        >
                            {name} {surname}
                        </Typography>
                    </Link>
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
                disabled={isLoading}
            >
                {isLoading ? (
                    <CircularProgress size={24}/>
                ) : (
                    disabled ? 'Débloquer' : 'Bloquer'
                )}
            </Button>
        </Paper>
    )
}

MemberCard.propTypes = {
    id: PropTypes.number,
    organizationId: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    job: PropTypes.string,
    profilePicture: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool
};

export default MemberCard