import ProfilForm from "../../components/Forms/ProfileForm"
import DoublePageLayout from "../../layout/DoublePageLayout"

import './style.scss'

function ProfileSettings() {

    return (
        
        <DoublePageLayout>
            <h5>ProfilSetting</h5>
            <ProfilForm/>
        </DoublePageLayout>
    )
}
export default ProfileSettings