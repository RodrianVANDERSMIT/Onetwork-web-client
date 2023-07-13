import HeaderBtn from "./HeaderBtn";
import Logo from "./Logo";
import {AppBar, Box, Toolbar} from '@mui/material'
import './style.scss'

export default function Header() {
    return (
    <Box>
        <AppBar className="c-header" sx={{height: '10vh'}}position="static">
            <Toolbar className="c-header box" >
                <Logo/>
                <HeaderBtn/>
            </Toolbar>
        </AppBar>
    </Box>
    );
}