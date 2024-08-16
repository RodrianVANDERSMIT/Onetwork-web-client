import PropTypes from "prop-types"
import { useForm } from 'react-hook-form'
import { useDispatch} from 'react-redux'

import { addNewComment } from '../../../redux/thunks/feed';

import { Paper, InputBase } from '@mui/material'
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import './style.scss'

function CommentForm({postId}) {

    const { register, handleSubmit, reset } = useForm();

    const dispatch = useDispatch();

    const onSubmit = ({text}) => {
    
        dispatch(addNewComment({text, postId}));
        reset();
        
    };
    
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '1em' }}
            className="c-feed-header__form"
            component="form"
            onSubmit={ handleSubmit(onSubmit)}
        >
            <InputBase id={`${postId}-comment-form-anchor`}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Commenter..."
                multiline
                type="text"
                {...register('text', {required: 'Veuillez saisir un texte!'})}
                
            />
            <IconButton 
                type="submit" 
                sx={{ p: '10px' }} >
                <SendIcon />
            </IconButton>
        </Paper>
    )
}

CommentForm.propTypes = {
    postId: PropTypes.number,
}

export default CommentForm