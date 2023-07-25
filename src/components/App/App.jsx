import { Routes, Route, Navigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import UserProfile from "../../views/UserProfile"
import Home from '../../views/Home'
import OrganizationCreation from '../../views/OrganizationCreation'
import Administration from '../../views/Administration'
import ProfileSettings from '../../views/ProfileSettings'
import Contact from '../../views/Contact'
import SignUp from '../../views/SignUp'
import ActivityFeed from '../../views/ActivityFeed'
import Error from '../Error'
import { useSelector } from 'react-redux'
import { getIsLogged, getUserOrganizationId } from '../../redux/selectors/user'


function App() {

    const isLog = useSelector(getIsLogged)
    const organizationId = useSelector(getUserOrganizationId)
    
       
    const ProtectedRoute = ({  children }) => {
        if (!isLog) {
            return <Navigate to="/" replace />;
        }
        return children;
    };
    
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-organization" element={<OrganizationCreation />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<Contact />} />
            <Route path="/error" element={<Error />} />
            <Route
                path={`/${organizationId}`}
                element={
                    <ProtectedRoute >
                        <ActivityFeed />
                    </ProtectedRoute>
                }
            />
            <Route
                path={`/${organizationId}/user/:userId`}
                element={
                    <ProtectedRoute >
                        <UserProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path={`/${organizationId}/user/:userId/edit`}
                element={
                    <ProtectedRoute >
                        <ProfileSettings />
                    </ProtectedRoute>
                }
            />
            <Route
                path={`/${organizationId}/admin/members`}
                element={
                    <ProtectedRoute >
                        <Administration />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

App.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node,
}

export default App
