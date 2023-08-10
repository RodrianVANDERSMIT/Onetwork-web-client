import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { cleanOrganizationState } from '../../../redux/reducers/organization';
import { getIsLogged, getUserId, getUserOrganizationId } from '../../../redux/selectors/user';
import BasicButton from '../../Buttons/BasicButton';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

import './style.scss';

export default function ButtonHome() {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLog = useSelector(getIsLogged);
    const currentPath = location.pathname;
    const organizationId = useSelector(getUserOrganizationId);
    const userId = useSelector(getUserId);


    const handleToHome = () => {
        dispatch(cleanOrganizationState());
    };

    return (
        <Box className="c-button-header" sx={{ flexGrow: 1 }}>
            {/* pour le bouton retour au flux d'activité si on est connecté sur desktop */}
            {isLog &&
                (currentPath === '/about' ||
                currentPath === `/${organizationId}/user/${userId}/edit` ||
                currentPath === '/error/403' ||
                currentPath === '/error/404' ||
                currentPath === '/error/500') && (
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
                currentPath === '/error/401' ||
                currentPath === '/error/404' ||
                currentPath === '/error/500') && (
                <Button
                    className="c-button-header_btn"
                    variant="outlined"
                    component={Link}
                    to="/"
                    onClick={handleToHome}
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