import React, { useContext, useMemo } from 'react';
import Login from '../components/Login';
import { AuthContext } from '../providers/authProvider/contexts';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withUserManagement = (WrappedComponent) => {
    const WithUserManagement = (props) => {
        const { authState } = useContext(AuthContext);
        const memoAuthorised = useMemo(() => authState.authorised, [authState.authorised]);
        console.log("Authorised", memoAuthorised);
        return memoAuthorised ? <WrappedComponent {...props} /> : <Login />;
    } 
    // Our hoc needs to return this inner component
    return WithUserManagement;
};

export default withUserManagement;