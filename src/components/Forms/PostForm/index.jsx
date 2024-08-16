import { useForm } from 'react-hook-form'
import { useDispatch} from 'react-redux'

import { createPost } from '../../../redux/thunks/feed';

import { InputBase, Paper } from '@mui/material'
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './style.scss'


function PostForm() {

    const { register, handleSubmit, reset } = useForm();

    const dispatch = useDispatch();

    const onSubmit = ({text}) => {

        dispatch(createPost(text));
        reset(); 
    }

    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginLeft: '1em' }}
            className="c-feed-header__form"
            component="form"
            onSubmit={ handleSubmit(onSubmit)}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Nouveau Post...'
                multiline
                type="text"
                {...register('text', {required: 'Veuillez saisir un texte!'})}

            />
            <IconButton
                sx={{ p: '10px' }}
                type="submit"
            >
                <SendIcon />
            </IconButton>
        </Paper>
    )
}

export default PostForm