import SimplePageLayout from "../../layout/SimplePageLayout"
import LoginForm from "../../components/Forms/LoginForm"

import './style.scss'

function Home() {

    return (
        <SimplePageLayout>
            <div className= "c-home">
                <div className="c-home__left">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, accusantium!</p>
                    <button>TODO to créer organisation</button>
                </div>
                <div className="c-home__right">
                    <LoginForm />
                </div>
            </div>
        </SimplePageLayout>
    )
}

export default Home
