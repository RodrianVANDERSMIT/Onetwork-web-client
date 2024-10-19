import { Box, CircularProgress } from "@mui/material"
import Logo from "../../components/Header/Logo"

function LoadingLayout() {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Logo />
            <CircularProgress size="3rem" sx={{ mt: 5 }} />
        </Box>
    )
}

export default LoadingLayout
