import PropTypes from "prop-types"
import Error from '../../layout/Error'



function Error404({message = "Accès refusé : La page que vous recherchez n'existe pas."}){

    return (
        <Error 
            code = {404}
            message = {message}
            image = "../../../../public/espace404.jpg"
        />       
    )
}


Error404.propTypes = {
    message: PropTypes.string

};

export default Error404


