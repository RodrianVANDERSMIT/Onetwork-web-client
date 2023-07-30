import Feed from "../../components/Feed"
import { useParams } from 'react-router-dom';

import AuthenticatedLayout from "../../layout/AuthenticatedLayout"
import './style.scss'

function UserProfile() {

    const { userId } = useParams();

    return (
     
        <AuthenticatedLayout>
            <Feed userIdchoice={userId}/>
        </AuthenticatedLayout>  
        
    )
}

export default UserProfile