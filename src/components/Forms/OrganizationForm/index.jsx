import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import './style.scss'
import { createOrganization } from '../../../redux/reducers/organization'

function OrganizationForm() {

const {register, handleSubmit} = useForm();
const dispatch = useDispatch();


const onSubmit = (organization) =>{
    console.log(organization);
    dispatch(createOrganization(organization))
}


    return (
        <div className="c-organization-form">
            <p className="c-organization-form__text">Bienvenue sur la page de création d'une organisation, merci de bien vouloir renseignez le nom de votre organisation et valider</p>
            <form className="c-organization-form__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                name="organization"
                type="text"
                label="Nom de votre organisation"
                {...register('organization',{required:true})}
                />
                <Button sx={{ m:1,}} className="c-organization-form__button" variant="contained" type="submit" >Valider</Button>
            </form>
            
        </div>
    )
}

export default OrganizationForm