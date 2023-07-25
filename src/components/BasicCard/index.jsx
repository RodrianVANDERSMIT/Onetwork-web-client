import PropTypes from "prop-types"
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/selectors/user'
import { Avatar, Box, Typography } from "@mui/material";
import './style.scss'



export default function BasicCard({className}) {
    const userLogged = useSelector(getUser)
    
    return (
        <Box className={className}>
            <Avatar className="c-avatar" alt={userLogged.name + userLogged.surname} src={userLogged.profilePicture} />
            <Box>
                <Typography>
                    {userLogged.surname}
                </Typography>
                <Typography>
                    {userLogged.name}
                </Typography>
            </Box>              
        </Box>
    );
}

BasicCard.propTypes = {
    className: PropTypes.string,   
};