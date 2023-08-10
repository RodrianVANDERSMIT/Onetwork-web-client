import Feed from "../../components/Feed"
import AuthenticatedLayout from "../../layout/AuthenticatedLayout"

import './style.scss'

function ActivityFeed() {

    return (
     
        <AuthenticatedLayout>
            <Feed/>
        </AuthenticatedLayout>  
        
    )
}

export default ActivityFeed