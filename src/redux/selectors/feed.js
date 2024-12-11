
export const getFeed = state => state.feed

export const getPosts = state => getFeed(state).posts;

export const getPost  = postId => state => getPosts(state).find((post) => post.id === postId)

export const getCurrentPage = state => getFeed(state).pagination.currentPage;

export const getHasMorePosts = state => getFeed(state).pagination.hasMorePosts;

export const getPostLoading = state => getFeed(state).loading;

/*export function getPost(postId) {

    return function (state) {

        return getPosts(state).find((post) => post.id === postId)
    }
}*/

export const  getPostComments = postId => state => getPost(postId)(state).comments;

export const getPostReactions = postId => state => getPost(postId)(state).reactions;
