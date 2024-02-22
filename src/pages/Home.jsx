import React, { useContext } from "react";
import { AuthContext } from "../providers/authProvider/contexts";

const Home = () => {
    const { code, stateToken } = useContext(AuthContext);

    if (code.length === 0) {
        return (
            <h1>You need to login...</h1>
        );
    }

    // console.log("log at home");
    console.log(stateToken);

    return (
        <>
            <h1>Spoti-Fi</h1>
            <ul>
                <li>Search for a song</li>
                <li>Make a new Playlist</li>
            </ul>
        </>
    )
}

export default Home;