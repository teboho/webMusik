import React from 'react';
import { fetchProfile, loginWithSpotify } from '../utilities/Auth';
import { Button } from 'antd';
import Welcome from '../components/welcome/Welcome';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent) => {

    const WithAuth = (props) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            // Ath this rate we should redresh the token from here
            fetchProfile(token)
                .then(json => {
                    console.log(json);
                })
                .catch(err => {
                    console.log("There was an error");
                })
        }

        if (token === undefined || token === null) {
            return <Welcome loginWithSpotify={loginWithSpotify} />;
        } 
        // Our inner component needs to return the wrapped component and provide it with its props
        return <WrappedComponent {...props} />;
    } 
    // Our hoc needs to return this inner component
    return WithAuth;
};

export default withAuth;