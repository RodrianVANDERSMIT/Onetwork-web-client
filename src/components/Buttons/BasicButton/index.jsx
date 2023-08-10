import PropTypes from "prop-types"
import Button from '@mui/material/Button';
import './style.scss'

export default function BasicButton({sx, className, variant, name, component, route}) {
    return (
        <Button 
            sx={sx} 
            className={className} 
            variant={variant}
            component={component} to={route}
        >
            {name}
        </Button>
    );
}

BasicButton.propTypes = {
    sx: PropTypes.object,
    className: PropTypes.string,
    variant: PropTypes.string,
    name: PropTypes.string,
    component: PropTypes.object,
    route: PropTypes.string  
  };

