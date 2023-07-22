import { Routes, Route} from 'react-router-dom'
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
import { getIsLogged } from '../../redux/selectors/user'


function App() {

    const isLog = useSelector(getIsLogged)
    
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-organization" element={<OrganizationCreation />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<Contact />} />

            {isLog ? (
                <>
                    <Route path="/:organization-id" element={<ActivityFeed />} />
                    <Route path="/:organization-id/user/:user-id" element={<UserProfile />} />
                    <Route path="/:organization-id/user/:user-id/edit" element={<ProfileSettings />} />
                    <Route path="/:organization-id/admin/members" element={<Administration />} />
                </>
            ) :
                <>
                    <Route path="/:organization-id" element={<Error />} />
                    <Route path="/:organization-id/user/:user-id" element={<Error />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/:organization-id/admin/members" element={<Error />} />
                </> 
            }
                
        </Routes>
    )
}

App.propTypes = {
    loading: PropTypes.bool,
}

export default App
