import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'


//import login


import './style.scss'

function LoginForm() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()

    const onSubmit = values => {
        // dispatch(login(values))
    }

    return (
        <div className="c-user-login-form">
            <h2>Connexion</h2>
            <p className="c-user-login__text">si vous êtes deja membres d'une organisation, remplissez les champs ci dessous pour vous connecter</p>
      
            <form className="c-user-login__form" onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                name="username"
                type="email"
                label="identifiant"
                {...register('Email',{required: "identifiant requis"})}
            />
            <TextField 
                name="password"
                type="text"
                label="password"
                {...register('Email',{required:'Mot de passe requis'})}
            />

        <Button sx={{ m:1,}} className="c-user-login__button" variant="contained" type="submit" >Connexion</Button>
      </form>
    </div>
    )
}

export default LoginForm