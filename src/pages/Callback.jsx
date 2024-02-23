import React, { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../providers/authProvider/contexts';
import { clientId, generateCodeVerifier, getAccessToken } from './Profile';

/**
 * We understand that the callback activity from spotify will bring a code query parameter...
 * and so we want to read that so we can start working with it for actual calls
 */
export default function Callback() {
    const { code, changeCode } = useContext(AuthContext);


    useEffect(() => {
        return () => {
            const queryString = new URLSearchParams(window.location.search);
            const theCode = queryString.get('code');

            changeCode(theCode)
        }
    }, [])

    const updatingCode = useMemo(() => {
        return code;
    })

    // I need to use the code to get the access token and save it to the state
    return (
        <>
            <h1>Callback</h1>
            <h1>{code}</h1>
        </>
    );
}