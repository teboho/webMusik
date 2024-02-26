import React, { useContext } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { clientId, getAccessToken, loginWithSpotify } from "./Profile";
import withAuth from "../hocs/withAuth";
import { Button } from 'antd';

function logOut() {
    localStorage.clear();
    document.location.reload();
}

const Home = () => {
   
    return (
        <div style={{textAlign: "center", textWrap: "pretty"}}>
            <h1><em>web</em>Musik</h1>
            <ul style={{
                    listStyleType: "none"
                }}>
                <li>Search for a song</li>
                <li>Play a song</li>
                <li>Queue a song</li>
                <li>... more coming soon ...</li>
            </ul>
            <Button onClick={logOut}
                 style={{
                    background: "rgb(215,211,210)",
                    background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)",
                    fontWeight: "bold"
                }}
            >
                Logout
            </Button>
        </div>
    )
}

/**
 * Wrapping this component with the hoc withAuth so it's only accessible by logged in users
 */
export default withAuth(Home);