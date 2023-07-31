export const getMembers = state => state.members;

export const getAdminMembers = state => getMembers(state).role.tag = "admin"
