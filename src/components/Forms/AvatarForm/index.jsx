import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './style.scss'

function AvatarForm ({ register }) {
    console.log("AvatarForm");
    const hiddenInputRef = useRef();

    const { ref: registerRef, ...rest } = register("profile_picture");

    const [preview, setPreview] = useState();

    const handleUploadedFile = (event) => {
        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const onUpload = () => {
        hiddenInputRef.current.click();
    };

    const onDelete = () => {
        setPreview(null);
    };

    const uploadButtonLabel = preview ? "Changer l'image" : "Choisir un fichier";

    return (
        <Box
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
                onChange={handleUploadedFile}
                ref={(event) => {
                    registerRef(event);
                    hiddenInputRef.current = event;
                }}
            />
            <Avatar
                src={preview}
                sx={{
                    width: 80,
                    height: 80
                }}
            />

            <Button
                variant="outlined"
                onClick={onUpload}
            >
                {uploadButtonLabel}
            </Button>
            <Button
                variant="outlined"
                onClick={onDelete}
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