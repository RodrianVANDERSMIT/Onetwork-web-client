export const getUser =state => state.user;

export const getName = state => getUser(state).name;

export const getIsLogged = state => getName(state) !== "";

export const getUserError = state => getUser(state).error