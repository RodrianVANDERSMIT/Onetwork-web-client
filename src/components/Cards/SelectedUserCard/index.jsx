import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "../../../redux/selectors/members";
import { getUserOrganizationId } from "../../../redux/selectors/user";
import { useEffect } from "react";
import { fetchMembers } from "../../../redux/thunks/members";

import './style.scss'

function SelectedUserCard() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const userIdUrl = parseInt(userId, 10);

    const membersState = useSelector(getMembers);
    const membersList = membersState.list;
    const selectedMember = membersList.find((member) => member.id === userIdUrl);

    const organizationId = useSelector(getUserOrganizationId);

    useEffect(() => {
        if (organizationId) {
            dispatch(fetchMembers(organizationId));
        } else {
            console.log("membres introuvable");
        }
    }, [organizationId, dispatch]);

    if (!selectedMember) {
        return (
            <Box>
                <Typography variant="body1">Utilisateur non trouvé.</Typography>
            </Box>
        );
    }

    return (
        <Box
            className= "c-user-card__group"
            sx= {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '170px',
                height:'170px'
            }}
        >
            <Avatar
                className= "c-user-card__avatar"
                src= {selectedMember.profilePicture}
                alt= {selectedMember.name + selectedMember.surname}
                sx= {{
                    width: '100px',
                    height: '100px',
                    my: 1
                }}
            />
            <Box
                className= "c-user-card__info"
                sx= {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pb: 1
                }}
            >
                <Typography
                    className= "c-user-card__identity"
                    variant= "body1"
                >
                    {selectedMember.name} {selectedMember.surname}
                </Typography>
                <Typography
                    className= "c-user-card__job"
                    variant= "body1"
                >
                    {selectedMember.job}
                </Typography>
            </Box>
        </Box>
    );
}

export default SelectedUserCard