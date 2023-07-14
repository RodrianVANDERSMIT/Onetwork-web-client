import Feed from "../../components/Feed"
import CardUser from "../../components/UserCard"
import SimplePage from "../../layout/SimplePage"
import Nav from "../../components/Nav"

import './style.scss'

function ActivityFeed() {

    return (
        <SimplePage>
            <CardUser/>
            <Nav/>
            <Feed/>
        </SimplePage>
    )
}


export default ActivityFeed