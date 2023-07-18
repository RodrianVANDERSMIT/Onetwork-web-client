import PropTypes from "prop-types"
import { Avatar, Box, Typography } from "@mui/material";
import './style.scss'



export default function BasicCard({className}) {
    return (
        <Box className={className}>
            <Avatar className="c-avatar" alt="Remy Sharp" src="https://randomuser.me/api/portraits/women/68.jpg" />
                <Box>
                <Typography>
                    RORO
                </Typography>
                <Typography>
                    roro
                </Typography>
                </Box>
                
        </Box>
    );
}

BasicCard.propTypes = {
    className: PropTypes.string,   
  };