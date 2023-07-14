import { Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './style.scss'

export default function HeaderButton() {
    return (
        <Box className='c-buttonContent' sx={{ flexGrow: 1 }}>
            <Button className='c-buttonContent btn'
                sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}
                variant="outlined"
            >
                Retour à laccueil
            </Button>
            <IconButton className='c-buttonContent icon'
                sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}
                edge="start"
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>
        </Box>
    );
}