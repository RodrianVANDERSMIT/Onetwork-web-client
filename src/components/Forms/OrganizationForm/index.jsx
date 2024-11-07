import { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { api } from '../../../services/api'
import useServerErrors from '../useServerErrors'


import './style.scss'



function OrganizationForm() {

    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [globalFormError, setGlobalFormError] = useState(null)
    const { setFieldsServerErrors } = useServerErrors()

    const onSubmit = async ({ name }) => {
        setIsLoading(true)
        setGlobalFormError(null)

        try {
            await api('/organizations/validation', { params: { name }})
            navigate('/sign-up', { state: { organizationName: name } });
        }
        catch (error) {
            if ([409, 422].includes(error.response.status)) {
                setFieldsServerErrors(setError, error)
            }
            else {
                setGlobalFormError({
                    status: error.response.status,
                    message: "Une erreur s'est produite lors de la création de l'organisation."
                });
            }
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="c-organization-form">
            <h2>{"Bienvenue sur la page de création d'une organisation !"}</h2>
            <p className="c-organization-form__text">Merci de bien vouloir renseigner le nom de votre organisation et cliquer sur le bouton de validation pour continuer.</p>
            
            <form className="c-organization-form__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    type="text"
                    label="Nom de votre organisation"
                    helperText= {errors.name?.message}
                    error = {!!errors.name}
                    {...register('name',{
                        required:"Le nom de l'organisation est requis",
                        minLength: {
                            value : 3,
                            message: "Le nom de l'organisation doit comporter au moins 3 caractères.",
                        },
                        maxLength: {
                            value : 50,
                            message: "Le nom de l'organisation doit comporter 50 caractères maximum.",
                        }
                    })}
                />
                {isLoading ? <CircularProgress/> : null}

                {globalFormError !== null && (
                    <p className="c-organization-form__error">{globalFormError.message}</p>
                )}

                <Button sx={{ m:1,}} className="c-organization-form__button" variant="contained" type="submit" >Valider</Button>
            </form>
        </div>
    )
}

export default OrganizationForm
