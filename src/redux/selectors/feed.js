export const getFeed = state => state.feed

export const getText = state => getFeed(state).text;

