import PropTypes from "prop-types"
import Error from '../../layout/Error'


function Error401({message = "Accès refusé : Vous devez être connecté pour accéder à cette page."}){

    return (
        <Error 
            code = {401}
            message = {message} 
            image = "/public/closedoor401.jpg"
        />       
    )
}


Error401.propTypes = {
    message: PropTypes.string

};

export default Error401
