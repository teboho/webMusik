import React, { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../providers/authProvider/contexts';
import { clientId, generateCodeVerifier, getAccessToken } from './Profile';

/**
 * We understand that the callback activity from spotify will bring a code query parameter...
 * and so we want to read that so we can start working with it for actual calls
 */
export default function Callback() {
    const { code, setCode, saveToken, token, altSave } = useContext(AuthContext);

    const queryString = new URLSearchParams(window.location.search);
    const theCode = queryString.get('code');

    useEffect(() => {

        return () => {
            getAccessToken(clientId, theCode)
                .then(data => {
                    console.log("getting access");
                    console.log(data);
                    return data;
                })
                .then(data => altSave(data));
            console.log("unmounting and saving to the provider");
            setCode(theCode);
            
        }
    }, []);

    // I need to use the code to get the access token and save it to the state
    if (code) {
        return (
            <>
                <p>Got tokens</p>
                <p>{token ? token: null}</p>
            </>
        );
    }

    return <h1>{theCode}</h1>;
}