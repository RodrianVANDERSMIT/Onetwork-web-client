import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import './style.scss'

function InvitForm() {
    console.log("Formulaire d'invitation");

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
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <p className="c-invit-form__text">Inviter un nouveau membre par email</p>
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