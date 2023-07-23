import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './style.scss'
function AvatarForm ({ register }) {
    const hiddenInputRef = useRef();

    const { ref: registerRef, ...rest } = register("profile_picture");

    const [preview, setPreview] = useState();

    const onUpdate = (event) => {
        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const onBrowse = () => {
        hiddenInputRef.current.click();
    };

    const onRemove = () => {
        setPreview(null);
        hiddenInputRef.current.value = null;
    };

    const uploadButtonLabel = preview ? "Changer l'image" : "Choisir un fichier";

    return (
        <Box className="c-avatar-form"
            sx={{
                maxWidth: '400px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                pb: 2,
            }}
        >
            <input
                className="c-avatar-form__input"
                type="file"
                name="profilePicture"
                {...rest}
                onChange={onUpdate}
                ref={(event) => {
                    registerRef(event);
                    hiddenInputRef.current = event;
                }}
            />
            <Avatar
                className="c-avatar-form__avatar"
                src={preview}
                sx={{
                    width: 80,
                    height: 80
                }}
            />

            <Button
                className="c-avatar-form__button"
                variant="outlined"
                onClick={onBrowse}
            >
                {uploadButtonLabel}
            </Button>
            <Button
                className="c-avatar-form__button"
                variant="outlined"
                onClick={onRemove}
            >
                X
            </Button>
        </Box>
    )
}

AvatarForm.propTypes = {
    register: PropTypes.object
};

export default AvatarForm