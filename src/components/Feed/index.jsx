import {  Typography,Paper, InputBase } from '@mui/material'
import { Box, Avatar, IconButton } from '@mui/material'

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import './style.scss'

function Feed() {

    return (
        <Box className="c-container-news" >
			<Box className="c-header-news">
				<Typography variant="h5" >
					{"Nom de l'organisation"}
				</Typography>
				<Box className="c-header-news__textarea" >
				<Avatar className="c-avatar" alt="Remy Sharp" src='https://randomuser.me/api/portraits/women/40.jpg' />
				<Paper
					component="form"
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,marginLeft: '1em' }}
					>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Nouveau Post..."
						inputProps={{ 'aria-label': 'search google maps' }}
						multiline
					/>
					<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
						<HistoryEduIcon />
					</IconButton>
				</Paper>
				</Box>
			</Box>
        </Box>
    )
}

export default Feed