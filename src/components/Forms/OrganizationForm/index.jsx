import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import './style.scss'
import { newOrganization } from '../../../redux/reducers/organization'

function OrganizationForm() {

const {register, handleSubmit} = useForm();
const dispatch = useDispatch();


const onSubmit = ({organizationName}) =>{
    console.log(organizationName);
    dispatch(newOrganization(organizationName))
}


    return (
        <div className="c-organization-form">
            <h2>Bienvenue sur la page de création d'une organisation !</h2>
            <p className="c-organization-form__text">Merci de bien vouloir renseigner le nom de votre organisation et cliquer sur le bouton de validation pour continuer.</p>
            <form className="c-organization-form__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                name="organization"
                type="text"
                label="Nom de votre organisation"
                {...register('organizationName',{required:true})}
                />
                <Button sx={{ m:1,}} className="c-organization-form__button" variant="contained" type="submit" >Valider</Button>
            </form>
        </div>
    )
}

export default OrganizationForm