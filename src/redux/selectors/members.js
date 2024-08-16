export const getMembers = state => state.members;

export const getMembersList = state => getMembers(state).list;

export const getMembersLoader = state => getMembers(state).loading;

