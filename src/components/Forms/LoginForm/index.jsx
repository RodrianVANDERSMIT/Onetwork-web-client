import { useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import {login} from "../../../redux/reducers/user"
import { getIsLogged } from '../../../redux/selectors/user'

import './style.scss'


function LoginForm() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged)
    const navigate = useNavigate();
    

    const onSubmit = (user) => {
        dispatch(login(user))
    }

    useEffect(() => {
        if (isLog) {
          navigate('/:organization-id');
        }
      }, [isLog, navigate]);


    return (
        <div className="c-user-login-form">
            <h2 className ="c-user-login___title">Connexion</h2>
            <p className="c-user-login__text">si vous êtes deja membres d'une organisation, remplissez les champs ci dessous pour vous connecter</p>
      
            <form className="c-user-login__form" onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                name="email"
                type="email"
                label="email"
                {...register('email',{required: "identifiant requis"})}
                autoComplete="email"
            />
            <TextField 
                name="password"
                label="Mot de passe"
                {...register('password',{required:'Mot de passe requis'})}
            />

        <Button type="sumbit" sx={{ m:1,}} className="c-user-login__button" variant="contained" >Connexion</Button>
      </form>
    </div>
    )
}

export default LoginForm