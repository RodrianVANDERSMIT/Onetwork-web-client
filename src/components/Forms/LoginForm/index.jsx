import { useEffect } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import {login} from "../../../redux/reducers/user"
import { getIsLogged, getUserError } from '../../../redux/selectors/user'

import './style.scss'


function LoginForm() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged)
    const navigate = useNavigate();
    const userError = useSelector(getUserError);
    

    const onSubmit = (user) => {
        dispatch(login(user))
    }

    useEffect(() => {
        if (isLog) {
            navigate('/:organization-id');
        }
    }, [isLog, navigate]);


    return (
        <Box className="c-user-login" >
            <div id="connexion"></div>
            <Typography variant="h4" className="c-user-login__title">
            Connexion
            </Typography>
            <Typography variant="body1" className="c-user-login__text">
            Si vous êtes déjà membre d'une organisation, veuillez remplir les champs ci-dessous pour vous connecter.
            </Typography>

            <Box component="form" className="c-user-login__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name="email"
                    type="email"
                    label="Email"
                    {...register('email', { required: 'Email requis' })}
                    autoComplete="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    name="password"
                    label="Mot de passe"
                    type="password"
                    {...register('password', { required: 'Mot de passe requis' })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                {userError !== null && <p className="c-user-login__error">{userError?.message}</p>}

                <Button type="submit" sx={{ mt: 2 }} fullWidth variant="contained" color="primary">
                Connexion
                </Button>
            </Box>
        </Box>
    );
}
    
export default LoginForm;


