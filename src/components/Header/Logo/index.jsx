import * as React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import Box from '@mui/material/Box';
import './style.scss'
import { Typography } from '@mui/material';

export default function Logo() {
    return (
    <Box component="div" className='c-logoContent'>
        <LanguageIcon className='c-logoContent icon' fontSize='large'/>
        <Typography className='c-logoContent name'>'Network</Typography>
    </Box>
    );
}