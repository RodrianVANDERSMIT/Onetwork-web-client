export const getUser = state => state.user;

export const getName = state => getUser(state).name;

export const getIsLogged = state => getName(state) !== "";

export const getUserError = state => getUser(state).error;

export const getUserOrganizationId = state => getUser(state).organization?.id;

export const getUserId = state => getUser(state).id;

export const getUserRole = state => getUser(state).role;

export const getUserLoading = state => getUser(state).loading;
