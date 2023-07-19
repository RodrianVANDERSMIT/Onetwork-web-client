import Button from "../../components/Buttons/BasicButton"
import UserCard from "../../components/UserCard"
import SimplePageLayout from "../../layout/SimplePageLayout"

import './style.scss'

function Contact() {

    return (
        <SimplePageLayout>
            <h5>Contact</h5>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
           
            <Button/>
        </SimplePageLayout>
    )
}

export default Contact