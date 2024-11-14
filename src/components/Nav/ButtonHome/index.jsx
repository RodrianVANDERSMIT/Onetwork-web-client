import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getIsLogged, getUserId, getUserOrganizationId } from '../../../redux/selectors/user';
import BasicButton from '../../Buttons/BasicButton';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { HashLink } from 'react-router-hash-link';
import { getErrorPageCode } from '../../../redux/selectors/errorPage';
import { ErrorCode } from '../../../redux/reducers/errorPage';

import './style.scss';

export default function ButtonHome() {
    const location = useLocation();
    const isLog = useSelector(getIsLogged);
    const errorCode = useSelector(getErrorPageCode)
    const currentPath = location.pathname;
    const organizationId = useSelector(getUserOrganizationId);
    const userId = useSelector(getUserId);

    return (
        <Box className="c-button-header" sx={{ flexGrow: 1 }}>
            {/* pour le bouton retour au flux d'activité si on est connecté sur desktop */}
            {isLog &&
                (currentPath === '/about' ||
                currentPath === `/${organizationId}/user/${userId}/edit` ||
                [ErrorCode[403], ErrorCode[404], ErrorCode[500]].includes(errorCode)) && (
                <BasicButton
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    className="c-button-header_btn"
                    variant="outlined"
                    name="Retour au flux d'activité"
                    component={Link}
                    route={isLog ? `/${organizationId}` : '/'}
                />
            )}

            {/* pour le bouton deja un compte sur mobile */}
            {currentPath === '/' && (
                <BasicButton
                    sx={{ display: { sm: 'block', md: 'none' } }}
                    className="c-button-header_btn"
                    variant="outlined"
                    name="Déjà un compte ?"
                    component={HashLink}
                    route="#connexion"
                />
            )}

            {/* pour le bouton retour a l'acceuil si l'utilisateur n'est pas connecté */}
            {!isLog &&
                (currentPath === '/sign-up' ||
                currentPath === '/new-organization' ||
                currentPath === '/about' ||
                [ErrorCode[401], ErrorCode[404], ErrorCode[500]].includes(errorCode)) && (
                <Button
                    className="c-button-header_btn"
                    variant="outlined"
                    component={Link}
                    to="/"
                >
                    {'Retour à l\'accueil'}
                </Button>
            )}
        </Box>
    );
}

ButtonHome.propTypes = {
    open: PropTypes.func,
};
