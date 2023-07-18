import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import {useDispatch} from 'react-redux'
import {addUser} from '../../../redux/reducers/user'
import './style.scss'

function ProfileForm() {
    console.log("Formulaire du profil");
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    // const onSubmit = data => console.log(data);
    const onSubmit = data => {
        dispatch(addUser(data))
    }

    return (
        <Box
        className=".c-profile-form"
        component="form"
        sx={{
            '& .MuiTextField-root': {
                                        mb: 2,
                                        width: '100%'
                                    },
            maxWidth: '400px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px:'10px',
        }}
        onSubmit={handleSubmit(onSubmit)}
        >
            <h3 className="c-profile-form__title">Bienvenue sur la création de votre profil utilisateur</h3>

            <Box
            className="c-profile-form__group"
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
            >
                <p className="c-profile-form__textfield">Votre compte</p>
                <TextField
                    required
                    label="Email"
                    type="email" {...register("email")}
                />
                <TextField
                    required
                    label="Mot de passe"
                    type="password" {...register("password")}
                />
            </Box>
            <Box
            className="c-profile-form__group"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                <p className="c-profile-form__textfield">Vous</p>
                {/* TODO Add Image*/}
                <TextField
                    required
                    label="Nom"
                    {...register("surname")}
                />
                <TextField
                    required
                    label="Prénom"
                    {...register("name")}
                />
            </Box>
            <Box
            className="c-profile-form__group"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                <p className="c-profile-form__textfield">Votre poste</p>
                {/* TODO Ajouté texte de description */}
                <TextField
                    required
                    label="Intitulé de poste"
                    {...register("job")}
                />
            </Box>
            <Button sx={{
                            mt:1,
                            mb:3
                    }}
                    className="c-organization-form__button"
                    variant="contained"
                    type="submit"
            >
                Enregistrer
            </Button>
        </Box>
    )
}

export default ProfileForm