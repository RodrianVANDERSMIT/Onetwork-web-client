import ProfileForm from "../../components/Forms/ProfileForm"
import DoublePageLayout from "../../layout/DoublePageLayout"

import './style.scss'

function SignUp() {

    return (
        <DoublePageLayout>
            <h5>SignUp</h5>
            <ProfileForm/>
        </DoublePageLayout>
    )
}


export default SignUp