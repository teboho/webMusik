import React, { useContext } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { clientId, getAccessToken, loginWithSpotify } from "./Profile";
import withAuth from "../hocs/withAuth";

function logOut() {
    localStorage.clear();
    document.location.reload();
}

const Home = () => {
    /*
    const token = localStorage.getItem("accessToken");

    if (token === undefined || token === null) {
        return (
            <>
                <h1>You need to login...</h1>
                <button onClick={loginWithSpotify}>Login with Spotify</button>
            </>
        );
    } 

    console.log(token);
    */
   
    return (
        <>
            <h1>Spoti-Fi</h1>
            <ul>
                <li>Search for a song</li>
                <li>Make a new Playlist</li>
            </ul>
            {/* <p>{token}</p> */}
            <button onClick={logOut}>Logout</button>

        </>
    )
}

/**
 * Wrapping this component with the hoc withAuth so it's only accessible by logged in users
 */
export default withAuth(Home);