import FooterButton from "./FooterButton";
import {Typography, Box} from '@mui/material'
import './style.scss'

export default function Footer() {
    return (
    <Box className= 'c-footer'>
        <Typography className= 'c-footer text' variant="subtitle2"  >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur
        </Typography>
        <FooterButton/>
    </Box>
    );
}