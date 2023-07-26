import { useSelector } from 'react-redux';

import SimplePageLayout from '../../layout/SimplePageLayout';
import { getUserError } from '../../redux/selectors/user';
import {  Box } from "@mui/material"
import './style.scss';







const Error = () => {

    const error= useSelector(getUserError)
    console.log(error)

    return (
        <SimplePageLayout>
            <Box className="c-error"> 
                <Box className="c-error__id">XXXXXXX</Box>
                <Box className="c-error__message">Une erreur est survenue...</Box>
            </Box>

        </SimplePageLayout>
    )
    
};

export default Error;