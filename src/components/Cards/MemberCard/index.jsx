import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Avatar, Box, Button, Typography, Paper} from '@mui/material';
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { Link as MuiLink } from '@mui/material'
import { api, fetchCsrfCookie } from '../../../services/api';
import './style.scss'



function MemberCard ({id, organization, name, surname, job, profilePicture, disabled, setMember}) {
    const { handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setIsLoading(true);

        try {
            await fetchCsrfCookie()
            const { data: member } = await api.patch(`/users/${id}`, { disabled: !disabled })
            setMember(member)
        }
        catch (error) {
            // TODO: instead of console logs, errors must be displayed directly to user
            if (error.response.status === 404) {
                console.error({ status: error.response.status, message: "Ce membre n'existe pas" })
            }
            else {
                console.error({ status: error.response.status, message: "Une erreur s'est produite" });
            }

        }
        finally {
            setIsLoading(false);
        }
    };

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
                    component={Link}
                    to={`/${organization.id}/user/${id}`}
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
                    <MuiLink 
                    component={Link}
                    to={`/${organization.id}/user/${id}`}
                    >
                        <Typography 
                            className="c-member-card__identity"
                            variant="body1"
                            sx={{mb:0.5}}
                        >
                            {name} {surname}
                        </Typography>
                    </MuiLink>
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
    organization: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.string,
    surname: PropTypes.string,
    job: PropTypes.string,
    profilePicture: PropTypes.string,
    disabled: PropTypes.bool,
    setMember: PropTypes.func.isRequired
};

export default MemberCard
