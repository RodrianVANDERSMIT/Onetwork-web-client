import Comment from '../Comment'
import CommentForm from '../Forms/CommentForm'

import './style.scss'

function Post() {
    console.log('Post');
    return (
        <div>
            Ici affichage du post
            <Comment />
            <CommentForm/>
        </div>
    )
}

export default Post