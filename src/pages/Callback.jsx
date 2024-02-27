import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../providers/authProvider/contexts';
import { clientId, fetchProfile, generateCodeVerifier, getAccessToken, loginWithSpotify } from '../utilities/Auth';
import { render } from 'react-dom';
import { Button } from 'antd';

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
        
        // we want to store the user's accessToken when login
        getAccessToken(clientId, code, verifier)
            .then(({access_token, refresh_token}) => {
                if (access_token && refresh_token) {
                    console.log("access_token", access_token);
                    console.log("refresh_token", refresh_token);
                    localStorage.setItem("accessToken", access_token);
                    localStorage.setItem("refreshToken", refresh_token);
                    setLoggedIn(true);
                }
            })
            .catch(err => {
                throw new Error(err);
            });        
    }, [])

    return (
        <>
            <h1><em>web</em>Musik</h1>
            {isLoggedIn ? 
                <p>Congrats, you're in! <br />Checkout <a href="/playlists">Playlists</a> to view your last saved playlists</p> : 
                (<>
                    <p>Something went wrong with your log in attempt. Please try again.</p>
                    <Button onClick={loginWithSpotify}
                        style={{
                            background: "rgb(215,211,210)",
                            background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)",
                            fontWeight: "bold"
                        }}
                    >
                        Login with Spotify
                    </Button>
                </>)
            }
            
        </>
    );
}