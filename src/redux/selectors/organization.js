const getOrganization = state => state.organization

export const getOrganizationName = state => getOrganization(state).name
