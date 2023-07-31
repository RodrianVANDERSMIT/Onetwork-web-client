import { Box, Button, TextField, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import './style.scss'

function InvitForm() {
    
    // const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {console.log(data)}

    return (
        <Box
            className="c-invit-form__group"
            component="form"
            noValidate
            sx={{
                maxWidth: '900px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                mb: 2
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography
                className="c-invit-form__invit"
                variant="body1"
                sx={{
                    mt:2,
                    mb:1
                }}
            >
                Inviter un nouveau membre par email
            </Typography>
            <Box
                className="c-invit-form__content"
            >
                <TextField 
                    className="c-invit-form__input"
                    sx={{mb:2}}
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
                <Button
                    className="c-invit-form__button"
                    variant="contained"
                    type="submit"
                >
                    {"Envoyer le lien d'invitation"}
                </Button>
            </Box>
        </Box>
    )
}

export default InvitForm