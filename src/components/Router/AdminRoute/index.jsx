import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAdmin } from '../../../redux/selectors/user';
import { ErrorCode, setErrorPage } from '../../../redux/reducers/errorPage';

export default function AdminRoute({ children }) {
    const dispatch = useDispatch()
    const isAdmin = useSelector(getIsAdmin);

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because the ErrorPageHandler component can interrupt
    // the rendering of every other one inside it once an error is set. Such an
    // interruption can lead to strange behaviors and fire an error in console.
    useEffect(() => {
        if (!isAdmin) {
            dispatch(setErrorPage(ErrorCode[403]))
        }
    })

    return isAdmin && children
}

AdminRoute.propTypes = {
    children: PropTypes.node,
}
