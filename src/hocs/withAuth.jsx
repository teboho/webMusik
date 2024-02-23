import React from 'react';
import { loginWithSpotify } from '../pages/Profile';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent) => {

    const WithAuth = (props) => {
        const token = localStorage.getItem("accessToken");

        if (token === undefined || token === null) {
            return (
                <>
                    <h1>You need to login...</h1>
                    <button onClick={loginWithSpotify}>Login with Spotify</button>
                </>
            );
        } 
        // Our inner component needs to return the wrapped component and provide it with its props
        return <WrappedComponent {...props} />;
    } 
    // Our hoc needs to return this inner component
    return WithAuth;
};

export default withAuth;