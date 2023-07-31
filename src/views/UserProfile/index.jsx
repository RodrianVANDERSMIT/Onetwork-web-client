import Feed from "../../components/Feed"
import { useParams } from 'react-router-dom';

import AuthenticatedLayout from "../../layout/AuthenticatedLayout"
import './style.scss'

function UserProfile() {

    const { userId } = useParams();
    
    return (
     
        <AuthenticatedLayout>
            <Feed userIdUrl={parseInt(userId)}/>
        </AuthenticatedLayout>  
        
    )
}

export default UserProfile