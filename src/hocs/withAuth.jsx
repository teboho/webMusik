import React from 'react';
import { loginWithSpotify } from '../utilities/Auth';
import { Button } from 'antd';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent) => {

    const WithAuth = (props) => {
        const token = localStorage.getItem("accessToken");

        if (token === undefined || token === null) {
            return (
                <div style={{
                    width: "fit-content",
                    margin: "0 auto"
                }}>
                    <h1>webMusik</h1>
                    <h3>You need to login...</h3>
                    <Button style={{
                        fontWeight: "bold"
                    }}
                    onClick={loginWithSpotify}>Login with Spotify</Button>
                </div>
            );
        } 
        // Our inner component needs to return the wrapped component and provide it with its props
        return <WrappedComponent {...props} />;
    } 
    // Our hoc needs to return this inner component
    return WithAuth;
};

export default withAuth;