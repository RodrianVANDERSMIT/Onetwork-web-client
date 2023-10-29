import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { api, fetchCsrfCookie } from '../../../services/api';
import './style.scss'

function InvitForm() {
    
    // const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async ({ email }) => {
        setIsLoading(true)
        await fetchCsrfCookie()
        await api.post('/invitations', { email })
        setIsLoading(false)
        reset()
    }

    return (
        <Box
            className="c-invit-form__group"
            component="form"
            noValidate
            sx={{
                maxWidth: '900px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                mb: 2
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography
                className="c-invit-form__invit"
                variant="body1"
                sx={{
                    mt:2,
                    mb:1
                }}
            >
                Inviter un nouveau membre par email
            </Typography>
            <Box
                className="c-invit-form__content"
            >
                <TextField 
                    className="c-invit-form__input"
                    sx={{mb:2}}
                    label="Email"
                    helperText= {errors.email?.message}
                    error = {!!errors.email}
                    type="email"{...register("email", {
                        required: "L'email est requis",
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "L'email doit être valide.",
                        },
                        maxLength: {
                            value : 255,
                            message: "L'email doit comporter 255 lettres maximum.",
                        }
                    })}
                />
                <Button
                    className="c-invit-form__button"
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                >
                    {"Envoyer le lien d'invitation"}
                </Button>
            </Box>
        </Box>
    )
}

export default InvitForm
