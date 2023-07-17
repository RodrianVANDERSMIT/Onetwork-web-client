import Box from '@mui/material/Box';
import './style.scss'

export default function Logo() {
    return (
        <Box component="div" className="c-logo">
            <img className="c-logo__img" src="/public/assets/logo.svg" alt="Logo O'Network" />
        </Box>
    );
}
