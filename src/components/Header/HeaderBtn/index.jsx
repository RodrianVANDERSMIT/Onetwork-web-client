import { Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './style.scss'

export default function HeaderButton() {
    return (
        <Box className='c-button-header' sx={{ flexGrow: 1 }}>
            <Button className='c-button-header_btn'
                sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}
                variant="outlined"
            >
                {"Retour à l'accueil"}
            </Button>
            <IconButton className='c-button-header_icon'
                sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}
                edge="start"
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>
        </Box>
    );
}