import PropTypes from "prop-types"
import moment from 'moment'

import { ListItem, ListItemAvatar, Paper } from '@mui/material';
import { Avatar, Typography, } from '@mui/material';
import './style.scss'
import { Link } from "react-router-dom";
import { Link as MuiLink } from '@mui/material'


function Comment({ author,text,createdAt}) {

    //Date and time reformatting
    const date = moment(createdAt).format('DD/MM/YYYY');
    const time = moment(createdAt).format('HH[h]mm')
   
    return (
        <ListItem className="c-comment-list" alignItems="flex-start">
            <ListItemAvatar>
                <Link to={`/${author.organizationId}/user/${author.id}`}>
                    <Avatar alt="Remy Sharp" src={author.profilePicture} />
                </Link>
            </ListItemAvatar>
            <Paper className="c-comment-list__paper" >
                <MuiLink 
                    component={Link}
                    to={`/${author.organizationId}/user/${author.id}`}
                >
                    <Typography
                        className= "c-comment-list__identity"
                        variant= "body1"
                        >
                        {`${author.name} ${author.surname}`}
                    </Typography>
                </MuiLink> - {date} à {time}
                <Typography className="c-comment-list__job" variant="body2">
                    {author.job}
                </Typography>
                <Typography className="c-comment-list__text" variant="body1" mt={2}>
                    {text}
                </Typography>
            </Paper>
        </ListItem>
    )
}

Comment.propTypes = {
    author: PropTypes.object,
    text: PropTypes.string,
    createdAt: PropTypes.string,   
};

export default Comment