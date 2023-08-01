import AvatarForm from "../AvatarForm";
import { Box, Button, TextField, Typography } from '@mui/material';
import { addUser, updateUser } from '../../../redux/reducers/user'
import { getUser, getIsLogged, getUserError } from '../../../redux/selectors/user'
import {getOrganizationName } from '../../../redux/selectors/organization'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

import './style.scss'
import { createOrganization } from "../../../redux/thunks/organization";

function ProfileForm() {

    const dispatch = useDispatch();
    const isLog = useSelector(getIsLogged)
    const navigate = useNavigate();
    const userError = useSelector(getUserError);
    const organizationName = useSelector(getOrganizationName)
    const user = (useSelector(getUser));
    const surname = user.surname
    const name = user.name
    const job = user.job

    

    const {
        register,
        watch,
        control,
        resetField,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            surname: surname,
            name: name,
            job: job,
        }
    });

    const newPassword = watch("newPassword");
    const currentPassword = watch("currentPassword");

    const title = (isLog) => {
        if (!isLog){
            return "Bienvenue sur la création de votre profil utilisateur"
        }
        return "Bienvenue sur la modification votre profil utilisateur"
    }

    const onSubmit = (data) => {
        if (!isLog) {
            dispatch(createOrganization(organizationName))
            dispatch(addUser(data)).unwrap()
                .then(() => navigate(`/`))
                .catch(() => {})
        }
        if (isLog) {
            dispatch(updateUser(data)).unwrap()
                .then(() => navigate(`/`))
                .catch(() => {})
        }
    };

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
            <Typography
                className="c-profile-form__title"
                component="h1"
                variant="h4"
                sx={{my:2}}
            >
                {title(isLog)}
            </Typography>
            {isLog === false && (
                <Box
                    className="c-profile-form__group"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        className="c-profile-form__subtitle"
                        variant="body1"
                        sx={{mb:1}}
                    >
                        Votre compte
                    </Typography>
                    <TextField
                        className="c-profile-form__input"
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
                        className="c-profile-form__input"
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
                    {userError !== null && <p className="c-profile-form__error">{userError?.message}</p>}
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
                    <Typography
                        className="c-profile-form__subtitle"
                        variant="body1"
                        sx={{mb:1}}
                    >
                        Votre compte
                    </Typography>
                    <TextField
                        className="c-profile-form__input"
                        label="Ancien mot de passe"
                        helperText= {errors.currentPassword?.message}
                        error = {!!errors.currentPassword}
                        type="password" {...register("currentPassword",{
                            required: newPassword ? "L'ancien mot de passe est requis." : null,
                        })}
                    />
                    <TextField
                        className="c-profile-form__input"
                        label="Nouveau mot de passe"
                        helperText= {errors.newPassword?.message}
                        error = {!!errors.newPassword}
                        type="password" {...register("newPassword",{
                            required: currentPassword ? "Le nouveau mot de passe est requis." : null,
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                            }
                        })}
                    />

                    {userError !== null && <p className="c-profile-form__error">{userError?.message}</p>}

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
                <Typography
                    className="c-profile-form__subtitle"
                    variant="body1"
                    sx={{mb:1}}
                >
                    Vous
                </Typography>
                <AvatarForm
                    className="c-profile-form__avatar"
                    control={control}
                    resetField={resetField}
                />
                <TextField
                    className="c-profile-form__input"
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
                    className="c-profile-form__input"
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
                <Typography
                    className="c-profile-form__subtitle"
                    variant="body1"
                    sx={{mb:1}}
                >
                    Votre poste
                </Typography>
                <Typography
                    className="c-profile-form__textfield"
                    variant="body1"
                    sx={{mb:2}}
                >
                    Indiquez ici l’intitulé du poste que vous occupez au sein de l’organisation (p. ex. : graphiste, responsable markteting, etc.)
                </Typography>
                <TextField
                    className="c-profile-form__input"
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
            <Button
                className="c-profile-form__button"
                sx={{
                    mt:1,
                    mb:3
                }}
                variant="contained"
                type="submit"
            >
                Enregistrer
            </Button>
        </Box>    )
}

export default ProfileForm