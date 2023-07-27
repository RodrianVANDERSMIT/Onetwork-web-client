import PropTypes from "prop-types"
import Error from '../../layout/Error'


function Error403({message = "Désolé, vous n'avez pas l'autorisation d'accéder à cette page."}){

    return (
        <Error 
            code = {403}
            message = {message}
            image = "../../../../public/sorcier403.jpg" 
        />       
    )
}


Error403.propTypes = {
    message: PropTypes.string

};

export default Error403


