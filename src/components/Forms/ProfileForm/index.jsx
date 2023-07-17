import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import './style.scss'

function ProfileForm() {
    console.log("Formulaire du profil");
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <Box
        className=".c-profile-form"
        component="form"
        sx={{
            '& .MuiTextField-root': {
                                        mb: 2,
                                        px:'10px',
                                        width: '100%'
                                    },
            maxWidth: '400px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
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
                    {...register("lastName")}
                />
                <TextField
                    required
                    label="Prénom"
                    {...register("firstName")}
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