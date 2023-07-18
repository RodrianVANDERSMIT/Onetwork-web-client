import ProfileForm from "../../components/Forms/ProfileForm"
import DoublePage from "../../layout/DoublePage"

import './style.scss'

function SignUp() {

    return (
        <DoublePage>
            <h5>SignUp</h5>
            <ProfileForm/>
        </DoublePage>
    )
}


export default SignUp