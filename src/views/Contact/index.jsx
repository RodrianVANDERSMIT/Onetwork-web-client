import Button from "../../components/Buttons/BasicButton"
import UserCard from "../../components/UserCard"
import SimplePage from "../../layout/SimplePage"

import './style.scss'

function Contact() {

    return (
        <SimplePage>
            <h5>Contact</h5>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
           
            <Button/>
        </SimplePage>
    )
}

export default Contact