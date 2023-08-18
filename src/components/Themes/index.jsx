import { createTheme } from '@mui/material/styles'

const Theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#00b894',
                    '&:hover': {
                        backgroundColor: '#00ebbd',
                    },
                },
                outlined: {
                    borderColor: '#3b3f45',
                    color: '#3b3f45',
                    '&:hover': {
                        backgroundColor:'#3b3f45',
                        borderColor: '#3b3f45',
                        color: '#f6f8fc',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.c-member-card__identity, &.c-user-card__identity, &.c-user-post__identity, &.c-reaction-post__identity': {
                        color: '#3b3f45',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#00b894',
                            textDecoration: 'underline',
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#00b894',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00b894',
                    }
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#00b894'
                },
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: '#00b894'
                },
            },
        },
    },
});

export default Theme;