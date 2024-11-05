import { useEffect, useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { api } from '../../../services/api'


import './style.scss'



function OrganizationForm() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const [organizationName, setOrganizationName] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [globalFormError, setGlobalFormError] = useState(null)

    const onSubmit = async ({ organizationName }) => {
        setIsLoading(true)

        try {
            await api('/organizations/validation', { params: {
                name: organizationName
            }})

            setOrganizationName(organizationName)
        }
        catch (error) {
            handleError(error)
        }
        finally {
            setIsLoading(false)
        }
    };

    const handleError = error => {
        if (error.response.status === 409) {
            setGlobalFormError({
                status: 409,
                message: 'Cette organisation existe déjà. Merci de choisir un autre nom.'
            });
        }
        else {
            setGlobalFormError({
                status: error.response.status,
                message: "Une erreur s'est produite lors de la création de l'organisation."
            });
        }
    }

    useEffect(() => {
        if (organizationName) {
            navigate('/sign-up', { state: { organizationName } });
        }
    }, [organizationName, navigate]);

    return (
        <div className="c-organization-form">
            <h2>{"Bienvenue sur la page de création d'une organisation !"}</h2>
            <p className="c-organization-form__text">Merci de bien vouloir renseigner le nom de votre organisation et cliquer sur le bouton de validation pour continuer.</p>
            
            <form className="c-organization-form__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    name="organization"
                    type="text"
                    label="Nom de votre organisation"
                    helperText= {errors.organizationName?.message}
                    error = {!!errors.organizationName}
                    {...register('organizationName',{
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
