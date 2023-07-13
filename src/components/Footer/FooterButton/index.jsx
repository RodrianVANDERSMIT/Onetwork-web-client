import * as React from 'react';
import { Button, Box } from '@mui/material';
import './style.scss'

export default function FooterButton() {
    return (
        <Box className='c-buttonFooter'>
            <Button 
                variant="outlined" 
                color='inherit'
                size='small'
            >
                Contact
            </Button>
        </Box>
    );
}