import { Redirect, Route } from 'react-router-dom';
import { getId, getUserToken } from '../utils/localRetrieve';


const isAuthenticated = () => !!getUserToken() && !!getId();

const AuthRoute = ({ children, ...rest }) => {
    return (
        <Route {...rest} render={() => {
            return isAuthenticated() ? children
                : <Redirect to='/' />
        }} />
    )
}

export default AuthRoute
