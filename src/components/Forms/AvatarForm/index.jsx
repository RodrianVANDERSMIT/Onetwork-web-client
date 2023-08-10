import { useRef, useState } from "react";
import { Controller } from "react-hook-form"
// import PropTypes from 'prop-types'; // TODO restore prop-types when Api is connected
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getIsLogged } from '../../../redux/selectors/user'
import { getUser } from '../../../redux/selectors/user'
import { useSelector } from 'react-redux';

import './style.scss'

function AvatarForm ({ control, resetField }) {

    const isLog = useSelector(getIsLogged)
    const user = (useSelector(getUser));
    const currentProfilePicture = user.profilePicture

    const inputRef = useRef(null)
    const [preview, setPreview] = useState(currentProfilePicture);

    const onUpdate = (file) => {
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const onBrowse = () => {
        inputRef.current.click();
    };

    const onRemove = () => {
        setPreview(null);
        resetField('profilePicture')
        inputRef.current.value = null;
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
            <Controller
                name="profilePicture"
                control={control}
                render={({field}) => (
                    <input
                        className="c-avatar-form__input"
                        type="file"
                        onChange={(e) => {
                            field.onChange(e.target.files[0])
                            onUpdate(e.target.files[0]);
                        }}
                        ref={(e) => {
                            field.ref(e);
                            inputRef.current = e;
                        }}
                    />
                )}
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
            {isLog === false && (
                <Button
                    className="c-avatar-form__button"
                    variant="outlined"
                    onClick={onRemove}
                >
                    X
                </Button>
            )}
        </Box>
    )
}
// TODO restore prop-types when Api is connected
// AvatarForm.propTypes = {
//     register: PropTypes.object
// };

export default AvatarForm