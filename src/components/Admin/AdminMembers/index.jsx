import Box from '@mui/material/Box';
import InvitForm from '../../Forms/InvitForm';

import './style.scss'

function AdminMembers () {
    console.log('Administration des membres')
    return (
        <Box
            className="c-admin-members__group"
            sx={{
                // maxWidth: '900px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                px:'10px'
            }}
        >
            <h1 className="c-admin-members__title">Administration</h1>
            <Box
                className="c-admin-members__invit"
            >
                <h2 className="c-admin-members__title">Gestion des membres</h2>
                <InvitForm/>
            </Box>
            <Box
                className="c-admin-members__cards"
            >
                <p className="c-admin-members__text">Ici toutes les members cards</p>
            </Box>
        </Box>
    )
}

export default AdminMembers