import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, Fade } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';



// buton to scroll to top
function ScrollTopButton() {


    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade  in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 75, right: 20 }}
            >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
                
            </Box>
        </Fade>
    );
}


export default ScrollTopButton