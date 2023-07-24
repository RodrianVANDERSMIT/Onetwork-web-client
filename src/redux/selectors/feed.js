export const getFeed = state => state.feed

export const getList = state => getFeed(state).list;

