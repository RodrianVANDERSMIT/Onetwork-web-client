import { useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { validateOrganization } from '../../../redux/reducers/organization'
import { getOrganizationName, getError} from '../../../redux/selectors/organization'


import './style.scss'



function OrganizationForm() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const organizationNameChoice = useSelector(getOrganizationName);
    const organizationError = useSelector(getError)


    useEffect(() => {
        if (organizationNameChoice !== "") {
            navigate('/sign-up');
        }
    }, [organizationNameChoice, navigate]);

    const onSubmit = ({ organizationName }) => {
        dispatch(validateOrganization(organizationName));
    };

    return (
        <div className="c-organization-form">
            <h2>{"Bienvenue sur la page de création d'une organisation !"}</h2>
            <p className="c-organization-form__text">Merci de bien vouloir renseigner le nom de votre organisation et cliquer sur le bouton de validation pour continuer.</p>
            
            <form className="c-organization-form__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    name="organization"
                    type="text"
                    label="Nom de votre organisation"
                    {...register('organizationName',{required:true, minLength: 3 })}
                />

                {errors.organizationName && errors.organizationName.type === "minLength" && (
                    <p className="c-organization-form__error">{"Le nom de l'organisation doit comporter au moins 3 caractères."}</p>
                )}

                {organizationError !== null && (
                    <p className="c-organization-form__error">{organizationError.message}</p>
                )}

                <Button sx={{ m:1,}} className="c-organization-form__button" variant="contained" type="submit" >Valider</Button>
            </form>
        </div>
    )
}

export default OrganizationForm