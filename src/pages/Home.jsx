import React, { useContext } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { clientId, getAccessToken, loginWithSpotify } from "./Profile";
import withAuth from "../hocs/withAuth";

function logOut() {
    localStorage.clear();
    document.location.reload();
}

const Home = () => {
   
    return (
        <>
            <h1>Spoti-Fi</h1>
            <ul>
                <li>Search for a song</li>
                <li>Make a new Playlist</li>
            </ul>

            <button onClick={logOut}>Logout</button>
        </>
    )
}

/**
 * Wrapping this component with the hoc withAuth so it's only accessible by logged in users
 */
export default withAuth(Home);