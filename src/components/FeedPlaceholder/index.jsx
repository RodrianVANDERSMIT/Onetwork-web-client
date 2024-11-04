import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { getPosts } from '../../redux/selectors/feed'

function FeedPlaceholder({ userId }) {
    const posts = useSelector(getPosts)

    return (
        <Typography variant="body1">
            {posts.length > 0
                ? "Pas de messages plus anciens"
                : userId
                    ? "Cet utilisateur n'a pas encore rédigé de post"
                    : "Aucun post n'a encore été publié dans cette organisation"
            }
        </Typography>
    )
}

FeedPlaceholder.propTypes = {
    userId: PropTypes.number
}

export default FeedPlaceholder
