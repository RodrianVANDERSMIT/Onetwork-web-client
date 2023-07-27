import { useSelector } from 'react-redux';
import PropTypes from "prop-types"
import SimplePageLayout from '../SimplePageLayout';
import { getUserError } from '../../redux/selectors/user';
import {  Box } from "@mui/material"
import './style.scss';







const Error = ({code , message, image }) => {

    const error= useSelector(getUserError)
    console.log(error)

    return (
        <SimplePageLayout>
            <Box className="c-error" >
                <Box className="c-error__content" > 
                    <Box component="h3" className="c-error__id" >{code}</Box>
                    <Box  className="c-error__message">{message}</Box>
                    <Box className="c-error__image">
                        <img 
                            src={image} alt="error image"></img>
                    </Box>
                </Box>
            </Box>

        </SimplePageLayout>
    )
    
};


Error.propTypes = {
    code: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,

};
export default Error;