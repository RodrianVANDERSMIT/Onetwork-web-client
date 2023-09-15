export const getUser = state => state.user;

export const getName = state => getUser(state).name;

export const getIsLogged = state => getName(state) !== "";

export const getUserError = state => getUser(state).error;

export const getUserOrganization = state => getUser(state).organization;
export const getUserOrganizationId = state => getUserOrganization(state)?.id;
export const getUserOrganizationName = state => getUserOrganization(state)?.name;

export const getUserId = state => getUser(state).id;

export const getUserRole = state => getUser(state).role;

export const getUserLoading = state => getUser(state).loading;
