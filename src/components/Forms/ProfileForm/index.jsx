import AvatarForm from "../AvatarForm";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addUser, updateUser } from '../../../redux/reducers/user' // added updateUser
// import { getIsLogged } from '../../../redux/selectors/user' // TODO Uncomment when test is ending
// import { useDispatch, useSelector } from 'react-redux' // TODO Uncomment when test is ending
import { useDispatch } from 'react-redux'  // TODO delete when test is ending
import { useForm } from "react-hook-form";
import './style.scss'

function ProfileForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    // const isLog = useSelector(getIsLogged) // TODO Uncomment when test is ending
    const isLog = true // TODO remove after test
    const title = (isLog) => {
        if (!isLog){
            return "Bienvenue sur la création de votre profil utilisateur"
        }
        return "Bienvenue sur la modification votre profil utilisateur"
    }

    // TODO delete if the new one onSubmit is OK
    // const onSubmit = data => {
    //     dispatch(addUser(data))
    // }

    // TODO the new one onSubmit
    const onSubmit = (data) => {
        if (!isLog){
            dispatch(addUser(data))
        }
        dispatch(updateUser(data))
    }

    return (
        <Box
            className="c-profile-form"
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
            {/* ****************************** If is notLogged ******************************** */}
            <h3 className="c-profile-form__title">{title(isLog)}</h3>
            {isLog === false && (
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
            )}
            {/* **************************** End if is notLogged ****************************** */}

            {/* ******************************** If is logged ********************************** */}
            {isLog === true && (
                <Box
                    className="c-profile-form__group"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <p>Votre compte</p>
                    <TextField
                        label="Ancien mot de passe"
                        helperText= {errors.password?.message}
                        error = {!!errors.password}
                        type="password" {...register("currentPassword",{
                            required: "L'ancien mot de passe est requis.",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                            }
                        })}
                    />
                    <TextField
                        label="Nouveau mot de passe"
                        helperText= {errors.password?.message}
                        error = {!!errors.password}
                        type="password" {...register("newPassword",{
                            required: "Le nouveau mot de passe est requis.",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                            }
                        })}
                    />
                </Box>
            )}
            {/* ****************************** End if is logged ******************************** */ }
            <Box
                className="c-profile-form__group"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <p>Vous</p>
                <AvatarForm
                    // value="" // TODO add connected user value
                    register={register}
                />
                <TextField
                    label="Nom"
                    value="" // TODO add connected user value
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
                    value="" // TODO add connected user value
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
                    value="" // TODO add connected user value
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