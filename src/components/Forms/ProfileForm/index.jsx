import AvatarForm from "../AvatarForm";
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { addUser, updateUser } from '../../../redux/reducers/user'
import { getUser, getIsLogged, getUserError } from '../../../redux/selectors/user'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { api, fetchCsrfCookie } from "../../../services/api";
import useServerErrors from "../useServerErrors";

import './style.scss'

function ProfileForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const isLog = useSelector(getIsLogged)
    const userError = useSelector(getUserError);
    const { setFieldsServerErrors } = useServerErrors()
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
        setError,
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

    const [deleteUserPicture, setDeleteUserPicture] = useState(false);

    const handleDeletePictureChange = (value) => {
        setDeleteUserPicture(value);
    };

    // This same form is used to sign up or to edit a user account
    const onSubmit = async (data) => {
        if (!isLog) {
            onUserCreation(data)
        }
        else {
            onUserEdit(data)
        }
    };

    const onUserCreation = async data => {
        if (invitation) {
            // For security purpose, we must ensure the user cannot modify
            // the email related to an invitation, so the server will use
            // the token to retrieve the one stored in Redis. But the email
            // field is displayed to the user, though disabled, so this data
            // is removed from the request to lighten it and reinforce the
            // server validation.
            data.invitationToken = invitation.token
            delete data.email
        }
        else {
            const organizationId = await createOrganization()
            data.organizationId = organizationId
        }

        try {
            await dispatch(addUser(data)).unwrap()
            navigate(`/`)
        }
        catch (error) {
            setFieldsServerErrors(setError, error)
        }
    }

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

    const onUserEdit = async data => {
        if (deleteUserPicture) {
            data.profilePicture = "";
        }

        try {
            await dispatch(updateUser(data)).unwrap()
            navigate(`/`)
        }
        catch (error) {
            setFieldsServerErrors(setError, error)
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
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px:'10px'
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            {token && !invitation ?
                <CircularProgress sx={{my: 6}} /> :
                <>
                    <Typography
                        className="c-profile-form__title"
                        component="h1"
                        variant="h4"
                        sx={{my:5}}
                    >
                        {isLog ?
                            "Votre profil":
                            invitation ? (
                                <>
                                    Rejoignez <Typography
                                        component="strong"
                                        variant="inherit"
                                        fontStyle="italic"
                                        fontWeight="fontWeightMedium"
                                    >
                                        {invitation.organization.name}
                                    </Typography> sur O'Network
                                </>
                            ) : (
                                "Créez votre profil"
                            )
                        }
                    </Typography>

                    <Box className="c-profile-form__body">
                        <Box className="c-profile-form__group">
                            <Typography
                                className="c-profile-form__subtitle"
                                variant="body1"
                                sx={{mb:1}}
                            >
                                Votre compte
                            </Typography>

                            {isLog ? (
                                // {/* ******************************** If is logged ********************************** */}
                                <>
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
                                </>
                                // {/* ****************************** End if is logged ******************************** */ }
                            ) : (
                                // {/* ****************************** If is notLogged ******************************** */}
                                <>
                                    <TextField
                                        className="c-profile-form__input"
                                        label="Email"
                                        disabled={!!invitation}
                                        helperText={errors.email?.message}
                                        error={!!errors.email}
                                        type="email"{...register("email", {
                                            required: "L'email est requis",
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: "L'email doit être valide.",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "L'email doit comporter 255 lettres maximum.",
                                            }
                                        })}
                                    />
                                    <TextField
                                        className="c-profile-form__input"
                                        label="Mot de passe"
                                        helperText={errors.password?.message}
                                        error={!!errors.password}
                                        type="password" {...register("password", {
                                            required: "Le mot de passe est requis.",
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                                message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                                            },
                                            maxLength: {
                                                value: 64,
                                                message: "Le mot de passe doit contenir 64 caractères maximum.",
                                            }
                                        })}
                                    />
                                </>
                                // {/* **************************** End if is notLogged ****************************** */}
                            )}
                        </Box>

                        <Box className="c-profile-form__group">
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
                        <Box className="c-profile-form__group">
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
                                Indiquez ici l'intitulé du poste que vous occupez au sein de l'organisation (p. ex. : graphiste, responsable marketing, etc.)
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

                        {/* This whole block for displaying global error messages is
                        a bit ugly... but there is no way to simplify it without
                        refactoring the way server errors are handled in the Redux
                        thunks. Some explanations:
                        - with a 422 status code (form validation errors from
                        Laravel), no global message
                        - with a 410 status code (invitation expired), the message
                        is in the server response
                        - in any other cases, the message is directly in
                        userError.message (check the Redux thunks to learn more)
                        */}
                        {userError !== null && userError?.response?.status !== 422 &&
                            <p className="c-profile-form__error">{
                                userError?.response?.status === 410 ?
                                    userError?.response?.data?.message:
                                    userError?.message
                            }</p>
                        }

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
                    </Box>
                </>
            }
        </Box>
    )
}

export default ProfileForm
