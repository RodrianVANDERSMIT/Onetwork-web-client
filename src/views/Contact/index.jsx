import { Avatar, Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import SimplePageLayout from "../../layout/SimplePageLayout";
import { Email } from '@mui/icons-material';

import './style.scss'

function Contact() {
    const theme = useTheme();
    const handleClick = () => {
        const contactEmail = "contact@onetwork.com" //TODO Change email
        window.location.href = `mailto:${contactEmail}`
    }

    return (
        <SimplePageLayout>
            <Box className= "c-contact-page">
                <Typography
                    className= "c-contact-page__title"
                    component="h1"
                    variant="h3"
                    sx= {{
                        marginLeft:'auto',
                        marginRight:'auto',
                        mt:6
                    }}
                >
                    À propos de nous
                </Typography>
                <Grid
                    className="c-contact-page__team"
                    container spacing={2}
                    sx={{
                        marginY: theme.breakpoints.up('xs') ? '50px' : '70px',
                        [theme.breakpoints.up('md')]: {
                            marginY: '70px',
                        },
                        [theme.breakpoints.up('lg')]: {
                            marginY: '100px',
                        },
                    }}
                >
                    <Grid
                        item xs={12} sm={6} lg={3}
                        className= "c-team-card"
                    >
                        {/* ************ Team member 1 **************** */}
                        <Paper
                            className= "c-team-card__member"
                            elevation={3}
                        >
                            <Avatar
                                className= "c-team-card__avatar"
                                src= "/assets/team/Jon-avatar.png"
                                alt= "Jon Garbayo"
                                sx= {{
                                    width: '100px',
                                    height: '100px',
                                    m: 2
                                }}
                            />
                            <Box
                                className= "c-team-card__info"
                            >
                                <Typography
                                    className= "c-team-card__identity"
                                    variant= "body1"
                                >
                                    Jon Garbayo
                                </Typography>
                                <Typography
                                    className= "c-team-card__role"
                                    variant= "body1"
                                >
                                    Lead dev, Scrum master
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    {/* ************ Team member 2 **************** */}
                    <Grid
                        item xs={12} sm={6} lg={3}
                        className= "c-team-card"
                    >
                        <Paper
                            className= "c-team-card__member"
                            elevation={3}
                        >
                            <Avatar
                                className= "c-team-card__avatar"
                                src= "/assets/team/Pierre-avatar.png"
                                alt= "Pierre Hego"
                                sx= {{
                                    width: '100px',
                                    height: '100px',
                                    m: 2
                                }}
                            />
                            <Box
                                className= "c-team-card__info"
                            >
                                <Typography
                                    className= "c-team-card__identity"
                                    variant= "body1"
                                >
                                    Pierre Hego
                                </Typography>
                                <Typography
                                    className= "c-team-card__role"
                                    variant= "body1"
                                >
                                    Product owner
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    {/* ************ Team member 3 **************** */}
                    <Grid
                        item xs={12} sm={6} lg={3}
                        className= "c-team-card"
                    >
                        <Paper
                            className= "c-team-card__member"
                            elevation={3}
                        >
                            <Avatar
                                className= "c-team-card__avatar"
                                src= "/assets/team/Bruno-avatar.png"
                                alt= "Bruno Provost"
                                sx= {{
                                    width: '100px',
                                    height: '100px',
                                    m: 2
                                }}
                            />
                            <Box
                                className= "c-team-card__info"
                            >
                                <Typography
                                    className= "c-team-card__identity"
                                    variant= "body1"
                                >
                                    Bruno Provost
                                </Typography>
                                <Typography
                                    className= "c-team-card__role"
                                    variant= "body1"
                                >
                                    Référent technique Material UI
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    {/* ************ Team member 4 **************** */}
                    <Grid
                        item xs={12} sm={6} lg={3}
                        className= "c-team-card"
                    >
                        <Paper
                            className= "c-team-card__member"
                            elevation={3}
                        >
                            <Avatar
                                className= "c-team-card__avatar"
                                src= "/assets/team/Rodrian-avatar.png"
                                alt= "Rodrian Van Der Smit"
                                sx= {{
                                    width: '100px',
                                    height: '100px',
                                    m: 2
                                }}
                            />
                            <Box
                                className= "c-team-card__info"
                            >
                                <Typography
                                    className= "c-team-card__identity"
                                    variant= "body1"
                                >
                                    Rodrian Van Der Smit
                                </Typography>
                                <Typography
                                    className= "c-team-card__role"
                                    variant= "body1"
                                >
                                    Référent technique Git
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    className="c-contact-page__button"
                    variant="outlined"
                    sx={{
                        mt:4,
                        marginLeft:'auto',
                        marginRight:'auto',
                    }}
                    onClick={handleClick}
                    startIcon={<Email />}
                >
                    Nous contacter
                </Button>
            </Box>
        </SimplePageLayout>
    )
}

export default Contact