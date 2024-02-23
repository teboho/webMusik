import React, { useContext } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { clientId, getAccessToken, loginWithSpotify } from "./Profile";

const Home = () => {
    const { code } = useContext(AuthContext);

    console.log(code)

    if (code === undefined) {
        return (
            <>
            <h1>You need to login...</h1>
            <button onClick={loginWithSpotify}>Login with Spotify</button>
            </>
        );
    } else {
        // getAccessToken(clientId, code)
    }

    return (
        <>
            <h1>Spoti-Fi</h1>
            <ul>
                <li>Search for a song</li>
                <li>Make a new Playlist</li>
            </ul>
            <p>{code}</p>
        </>
    )
}

export default Home;