import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserOrganizationId } from '../../redux/selectors/user'
import AuthenticatedRoute from './ConditionalRoute/AuthenticatedRoute'
import GuestRoute from './ConditionalRoute/GuestRoute'
import AdminRoute from './ConditionalRoute/AdminRoute'
import UserProfile from "../../views/UserProfile"
import Home from '../../views/Home'
import OrganizationCreation from '../../views/OrganizationCreation'
import Administration from '../../views/Administration'
import ProfileSettings from '../../views/ProfileSettings'
import Contact from '../../views/Contact'
import SignUp from '../../views/SignUp'
import ActivityFeed from '../../views/ActivityFeed'
import NotFoundRoute from './NotFoundRoute'
import useInterceptors from './hook'
import OrganizationRouteValidator from './OrganizationRouteValidator'

export default function Router() {
    // Axios interceptors for all requests
    useInterceptors()

    const organizationId = useSelector(getUserOrganizationId)

    return (
        <Routes>
            <Route path="/" element={
                <GuestRoute redirectTo={`/${organizationId}`}>
                    <Home />
                </GuestRoute>
            } />
            <Route path="/new-organization" element={
                <GuestRoute>
                    <OrganizationCreation />
                </GuestRoute>
            } />
            <Route path="/sign-up" element={
                <GuestRoute>
                    <SignUp />
                </GuestRoute>
            } />
            <Route path="/about" element={<Contact />} />

            <Route path="/:organizationId" element={<OrganizationRouteValidator />}>
                <Route index element={
                    <AuthenticatedRoute >
                        <ActivityFeed />
                    </AuthenticatedRoute>
                } />
                <Route path="user/:userId" element={
                    <AuthenticatedRoute >
                        <UserProfile />
                    </AuthenticatedRoute>
                } />
                <Route path="user/:userId/edit" element={
                    <AuthenticatedRoute >
                        <ProfileSettings />
                    </AuthenticatedRoute>
                } />
                <Route path="admin/members" element={
                    <AuthenticatedRoute >
                        <AdminRoute>
                            <Administration />
                        </AdminRoute>
                    </AuthenticatedRoute>
                } />
            </Route>

            <Route path="/*" element={<NotFoundRoute />} />
        </Routes>
    )
}
