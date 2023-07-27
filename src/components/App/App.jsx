import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserProfile from "../../views/UserProfile"
import Home from '../../views/Home'
import OrganizationCreation from '../../views/OrganizationCreation'
import Administration from '../../views/Administration'
import ProfileSettings from '../../views/ProfileSettings'
import Contact from '../../views/Contact'
import SignUp from '../../views/SignUp'
import ActivityFeed from '../../views/ActivityFeed'
import { useSelector} from 'react-redux'
import { getIsLogged, getUserRole } from '../../redux/selectors/user'
import Error401 from '../../views/Error401'
import Error403 from '../../views/Error403'
import Error404 from '../../views/Error404'
import Error500 from '../../views/Error500'



function App() {

    const isLog = useSelector(getIsLogged);
    const userRole = useSelector(getUserRole);
   

    const ProtectedRoute = ({  children }) => {
        const { organizationId } = useParams();
        console.log(organizationId)
        const organizationIdIsValid = Number.isInteger(parseInt(organizationId))
        console.log(organizationIdIsValid)
        if (!isLog) {
            return <Navigate to="/error/401" replace/>
        }
        if (!organizationIdIsValid){
            return <Navigate to="/error/404" replace/>
        }
        
        return children
    };
    const AdminRoute = ({ children }) => {
        if (userRole.tag === "admin"){
            return <Navigate to="/error/403" replace/>
        }
        return children
    };
    
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-organization" element={<OrganizationCreation />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<Contact />} />
            <Route path="/error/401" element={<Error401 />} />
            <Route path="/error/403" element={<Error403 />} />
            <Route path="/error/404" element={<Error404 />} />
            <Route path="/error/500" element={<Error500 />} />
            <Route
                path={`/:organizationId`}
                element={
                    <ProtectedRoute >
                        <ActivityFeed />
                    </ProtectedRoute>
                }
            />
            <Route
                path={`/:organizationId/user/:userId`}
                element={
                    <ProtectedRoute >
                        <UserProfile />
                    </ProtectedRoute>
                }
            />
            
            <Route
                path={`/:organizationId/user/:userId/edit`}
                element={
                    <ProtectedRoute >
                        <ProfileSettings />
                    </ProtectedRoute>
                }
            />
            <Route
                path={`/:organizationId/admin/members`}
                element={
                    <ProtectedRoute >
                        <AdminRoute>
                            <Administration />
                        </AdminRoute>
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/*" 
                element={ <Error404 />}
            />
        </Routes>  
    )
}


App.propTypes = {
    children: PropTypes.node,
}

export default App
