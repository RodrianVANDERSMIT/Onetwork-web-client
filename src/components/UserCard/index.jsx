import  PropTypes from 'prop-types';
import './style.scss'

function UserCard ({children}) {
    console.log("Card User");
    return (
        <div>
            Ici la card utilisateur
            {children}
        </div>
    )
}

UserCard.propTypes = {
    children: PropTypes.node
  };

export default UserCard