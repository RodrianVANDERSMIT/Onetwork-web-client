import SimplePageLayout from "../../layout/SimplePageLayout"
import LoginForm from "../../components/Forms/LoginForm"

import './style.scss'

function Home() {

  return (
    <SimplePageLayout>
      <h5>Home</h5>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, accusantium!</p>
        <button>TODO to créer organisation</button>
      </div>
      <LoginForm />
    </SimplePageLayout>
  )
}

export default Home
