import AvatarForm from "../AvatarForm";
import { Box, Button, TextField, Typography } from '@mui/material';
import { addUser, updateUser } from '../../../redux/reducers/user'
import { getUser, getIsLogged, getUserError } from '../../../redux/selectors/user'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { api, fetchCsrfCookie } from "../../../services/api";

import './style.scss'

function ProfileForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const isLog = useSelector(getIsLogged)
    const userError = useSelector(getUserError);
    const user = (useSelector(getUser));
    const surname = user.surname
    const name = user.name
    const job = user.job

    const [queryParams] = useSearchParams()
    const token = queryParams.get('token')
    const [invitation, setInvitation] = useState(null)

    const {
        register,
        watch,
        setValue,
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

    useEffect(() => {
        if (token === null) return

        if (!token.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/)) {
            navigate('/error/404')
            return
        }

        const fetchInvitation = async () => {
            try {
                const { data } = await api.get(`/invitations/${token}`)
                setInvitation(data)
                setValue('email', data.email)
            }
            catch (error) {
                if (error.response.status === 404) {
                    navigate('/error/404')
                }
                else {
                    navigate('/error/500')
                }
            }
        }

        fetchInvitation()
    }, [])


    const newPassword = watch("newPassword");
    const currentPassword = watch("currentPassword");

    const title = (isLog) => {
        if (!isLog){
            return "Bienvenue sur la création de votre profil utilisateur"
        }
        return "Bienvenue sur la modification votre profil utilisateur"
    }

    const [deleteUserPicture, setDeleteUserPicture] = useState(false);

    const handleDeletePictureChange = (value) => {
        setDeleteUserPicture(value);
    };

    const onSubmit = async (data) => {
        if (!isLog) {
            const organizationId = await createOrganization()

            data.organizationId = organizationId
            await dispatch(addUser(data)).unwrap()
            navigate(`/`)
        }
        if (isLog) {
            if (deleteUserPicture) {
                data.profilePicture = "";
            }
            await dispatch(updateUser(data)).unwrap()
            navigate(`/`)
        }
    };

    const createOrganization = async () => {
        try {
            await fetchCsrfCookie()

            const { organizationName } = location.state

            const { data: organization } = await api.post('/organizations', {
                name: organizationName
            })

            return organization.id
        }
        catch (error) {
            // TODO: instead of console logs, the errors must be displayed directly to the user
            if (error.response.status === 409) {
                throw new Error({ status: 409, message: 'Cette organisation existe déjà. Merci de choisir un autre nom.' });
            }
            else {
                throw new Error({ status: error.response.status, message: "Une erreur s'est produite lors de la création de l'organisation." });
            }
        }
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
                        disabled={!!invitation}
                        helperText= {errors.email?.message}
                        error = {!!errors.email}
                        type="email"{...register("email", {
                            required: "L'email est requis",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "L'email doit être valide.",
                            },
                            maxLength: {
                                value : 255,
                                message: "L'email doit comporter 255 lettres maximum.",
                            }
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
                            },
                            maxLength: {
                                value : 64,
                                message: "Le mot de passe doit contenir 64 caractères maximum.",
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
                            maxLength: {
                                value : 64,
                                message: "Le mot de passe doit contenir 64 caractères maximum.",
                            }
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
                            },
                            maxLength: {
                                value : 64,
                                message: "Le mot de passe doit contenir 64 caractères maximum.",
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
                    onDeletePictureChange={handleDeletePictureChange}
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
                        },
                        maxLength: {
                            value : 50,
                            message: "Le nom doit contenir 50 caractères maximum.",
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
                        },
                        maxLength: {
                            value : 50,
                            message: "Le prénom doit contenir 50 caractères maximum.",
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
                        },
                        maxLength: {
                            value : 255,
                            message: "Le titre du poste doit contenir 255 caractères maximum.",
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
