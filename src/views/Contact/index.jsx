import Button from "../../components/Button"
import UserCard from "../../components/UserCard"
import SimplePage from "../../layout/SimplePage"

import './style.scss'

function Contact() {

    return (
        <SimplePage>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
           
            <Button/>
        </SimplePage>
    )
}

export default Contact