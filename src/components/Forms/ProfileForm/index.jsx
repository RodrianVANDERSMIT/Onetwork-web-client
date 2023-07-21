import AvatarForm from "../AvatarForm";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addUser } from '../../../redux/reducers/user'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import './style.scss'

function ProfileForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const onSubmit = data => {
        console.log(data)
        dispatch(addUser(data))
    }

    return (
        <Box
            className=".c-profile-form"
            component="form"
            noValidate
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
                px:'10px'
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
                <p>Votre compte</p>
                <TextField
                    label="Email"
                    helperText= {errors.email?.message}
                    error = {!!errors.email}
                    type="email"{...register("email", {
                        required: "L'email est requis",
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "L'email doit être valide.",
                        },
                    })}
                />
                <TextField
                    label="Mot de passe"
                    helperText= {errors.password?.message}
                    error = {!!errors.password}
                    type="password" {...register("password",{
                        required: "Le mot de passe est requis.",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                            message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                        }
                    })}
                />
            </Box>
            <Box
                className="c-profile-form__group"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <p>Vous</p>
                <AvatarForm
                    register={register}
                />
                <TextField
                    label="Nom"
                    helperText= {errors.surname?.message}
                    error = {!!errors.surname}
                    type= "text"{...register("surname", {
                        required: "Le nom est requis.",
                        minLength: {
                            value : 3,
                            message: "Le nom doit comporter 3 lettres minimum.",
                        }
                    })}
                />
                <TextField
                    label="Prénom"
                    helperText= {errors.name?.message}
                    error = {!!errors.name}
                    type= "text"{...register("name", {
                        required: "Le prénom est requis.",
                        minLength: {
                            value : 3,
                            message: "Le prénom doit comporter 3 lettres minimum.",
                        }
                    })}
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
                <p>Indiquez ici l’intitulé du poste que vous occupez au sein de l’organisation (p. ex. : graphiste, responsable markteting, etc.)</p>
                <TextField
                    label="Intitulé de poste"
                    helperText= {errors.job?.message}
                    error = {!!errors.job}
                    type= "text"{...register("job", {
                        required: "L'intitulé de poste est requis.",
                        minLength: {
                            value : 3,
                            message: "Le titre du poste.",
                        }
                    })}
                />
            </Box>
            <Button sx={{
                mt:1,
                mb:3
            }}
            className="c-profile-form__button"
            variant="contained"
            type="submit"
            >
                Enregistrer
            </Button>
        </Box>    )
}

export default ProfileForm