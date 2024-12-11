import { useState } from 'react'
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import {login} from "../../../redux/reducers/user"

import './style.scss'


function LoginForm() {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Retrieve user-related data and states from Redux.
    const [globalFormError, setGlobalFormError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle form submission.
    const onSubmit = async (credentials) => {
        setIsLoading(true)

        try {
            const user = await dispatch(login(credentials)).unwrap()
            navigate(`/${user.organization.id}`)
        }
        catch (error) {
            setGlobalFormError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Box className="c-user-login" id="connexion" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" className="c-user-login__title"  sx={{ mb: 2 , textAlign: 'center' }}>
                Connexion
            </Typography>
            <Typography variant="body1" className="c-user-login__text"  sx={{ mb: 2 , textAlign: 'center'}}>
                Si vous êtes déjà membre d'une organisation, veuillez remplir les champs ci-dessous pour vous connecter.
            </Typography>

            <Box component="form" className="c-user-login__form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection:'column', alignItems:'center' }}>
                <TextField
                    type="email"
                    label="Email"
                    {...register('email', { required: 'Email requis' })}
                    autoComplete="email"
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Mot de passe"
                    type="password"
                    {...register('password', { required: 'Mot de passe requis' })}
                    fullWidth
                    margin="normal"
                />
                {isLoading ? <CircularProgress sx={{ mb: 2 }} /> : null}
                {globalFormError !== null && <p className="c-user-login__error">{globalFormError?.message}</p>}

                <Button type="submit" sx={{ mt: 2}} variant="contained">
                    Connexion
                </Button>
            </Box>
        </Box>
    );
}

export default LoginForm;
