import SimplePage from "../../layout/SimplePage"
import LoginForm from "../../components/Forms/LoginForm"

import './style.scss'

function Home() {

  return (
    <SimplePage>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, accusantium!</p>
        <button>TODO to créer organisation</button>
      </div>
      <LoginForm />
    </SimplePage>
  )
}

export default Home
