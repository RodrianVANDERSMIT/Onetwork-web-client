const getOrganization = state => state.organization


export const getError = state => getOrganization(state).error

export const getOrganizationName = state => getOrganization(state).name