import PropTypes from "prop-types"
import Error from '../../layout/Error'


function Error500({message = "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard."}){

    return (
        <Error 
            code = {500}
            message = {message}
            image = "../../../../public/cable500.jpg"
        />       
    )
}


Error500.propTypes = {
    message: PropTypes.string

};

export default Error500


