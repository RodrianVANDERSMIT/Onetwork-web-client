import { Paper, InputBase } from '@mui/material'
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import './style.scss'

function FormComment() {
    
    return (
        <Paper
            className="c-feed-header__form"
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '1em' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Commenter..."
                multiline
            />
            <IconButton type="button" sx={{ p: '10px' }} >
                <SendIcon />
            </IconButton>
        </Paper>
    )
}

export default FormComment