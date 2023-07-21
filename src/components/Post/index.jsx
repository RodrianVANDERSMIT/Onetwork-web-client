import {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import {CardActions, Divider} from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import { Paper, InputBase } from '@mui/material'
import { Box, IconButton } from '@mui/material'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import './style.scss'
import BasicButton from '../Buttons/BasicButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function Post() {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className='c-card-post'>
            <CardHeader
                avatar={
                    <Avatar className="c-avatar" alt="Remy Sharp" src="https://randomuser.me/api/portraits/women/68.jpg" />
                }       
                title="RORO"
                subheader="roro"
            />
            <Divider/>
            <CardContent>
                <Typography variant="body1" >
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
                </Typography>
            </CardContent>
            <Divider/>
            <CardContent className='c-counter'>
                <Typography variant="body2" color="text.secondary">
                Xréactions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Xcommentaires
                </Typography>
            </CardContent>
            <Divider/>
            <CardActions disableSpacing>
                <BasicButton 
                    className='c-btn footer' 
                    variant="outlined" 
                    name="J'aime"
                /> 
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <BasicButton 
                        className='c-btn footer' 
                        variant="outlined" 
                        name="Commenter"
                    />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <List>
                <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {"— I'll be in your neighborhood in your neighborhood doing errands in your neighborhood doing errands doing errands in your neighborhood doing errands in your neighborhood doing errands this…"}
              </Typography>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {"— I'll be in your neighborhood in your neighborhood doing errands in your neighborhood doing errands doing errands in your neighborhood doing errands in your neighborhood doing errands this…"}
              </Typography>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {"— I'll be in your neighborhood in your neighborhood doing errands in your neighborhood doing errands doing errands in your neighborhood doing errands in your neighborhood doing errands this…"}
              </Typography>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {"— I'll be in your neighborhood in your neighborhood doing errands in your neighborhood doing errands doing errands in your neighborhood doing errands in your neighborhood doing errands this…"}
              </Typography>
          }
        />
      </ListItem>
        </List>
                    
                </CardContent>
            </Collapse>
            <Box className="c-header-news">
				<Box className="c-header-news__textarea" >
				<Avatar className="c-avatar" alt="Remy Sharp" src='https://randomuser.me/api/portraits/women/40.jpg' />
				<Paper
					component="form"
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,marginLeft: '1em' }}
					>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Commenter..."
						multiline
					/>
					<IconButton type="button" sx={{ p: '10px' }} >
						<HistoryEduIcon />
					</IconButton>
				</Paper>
				</Box>
			</Box>
        </Card>
    )
}

export default Post