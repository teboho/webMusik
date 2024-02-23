import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../providers/authProvider/contexts';
import { clientId, fetchProfile, generateCodeVerifier, getAccessToken } from './Profile';
import { render } from 'react-dom';

/**
 * We understand that the callback activity from spotify will bring a code query parameter...
 * and so we want to read that so we can start working with it for actual calls
 */
export default function Callback() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const queryString = new URLSearchParams(window.location.search);
    const theCode = queryString.get('code');

    // Storing with local storage
    localStorage.setItem("code", theCode);

    useEffect(() => {
        const code = localStorage.getItem("code");
        const verifier = localStorage.getItem("verifier");
        console.log("code", code);
        console.log("verifier", verifier);
        
        getAccessToken(clientId, code, verifier)
            .then(token => {
                if (token) {
                    console.log(token);
                    localStorage.setItem("accessToken", token);
                    setLoggedIn(true);
                }
            })
            .catch(err => {
                throw new Error(err);
            });

        
    }, [])

    // I need to use the code to get the access token and save it to the state
    return (
        <>
            <h1>Callback</h1>
            {isLoggedIn ? <p>You're in</p> : null}
            {/* <h1>{localStorage.getItem("code")}</h1> */}
        </>
    );
}