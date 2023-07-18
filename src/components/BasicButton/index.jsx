import PropTypes from "prop-types"
import './style.scss'

import Button from '@mui/material/Button';
import './style.scss'

export default function BasicButton({sx, className, variant, name}) {
    return (
        <Button sx={sx} className={className} variant={variant}>{name}</Button>
    );
}

BasicButton.propTypes = {
    sx: PropTypes.object,
    className: PropTypes.string,
    variant: PropTypes.string,
    name: PropTypes.string,   
  };

