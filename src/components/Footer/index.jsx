import { Link } from 'react-router-dom'
import BasicButton from "../Buttons/BasicButton";
import {Typography, Box} from '@mui/material'
import './style.scss'


export default function Footer() {
    return (
    <Box className= 'c-footer'>
        <Typography className= 'c-footer__text' variant="subtitle2"  >
            {"Projet de fin de formation O'clock socle PHP spé REACT"}
        </Typography>
        <Box className='c-footerBtn'>
        <BasicButton 
            className='c-btn footer' 
            variant="outlined" 
            name="Contact"
            component={Link} route="/about"/>
        </Box>
    </Box>
    );
}