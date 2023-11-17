import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    //pull in the custom hook useAuthStatus.js
    const { loggedIn, loading } = useAuthStatus();
    //display loading if the user is not logged in
    if (loading) return <Spinner />;

    //if the user is logged in, display the profile page. If the user is not logged in, redirect to the sign-in page.
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute
