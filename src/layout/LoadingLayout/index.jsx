import { Box, CircularProgress } from "@mui/material"

function LoadingLayout() {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress size="3rem" />
        </Box>
    )
}

export default LoadingLayout
