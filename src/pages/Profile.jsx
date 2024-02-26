import { useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { loginReducer } from "../providers/authProvider/reducers";
import { loginAction } from "../providers/authProvider/actions";
import withAuth from "../hocs/withAuth";

/**
 * Call Web API
 * @param {*} token api access token
 */
export async function fetchProfile(token) {
    const result = await fetch(
        "https://api.spotify.com/v1/me",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await result.json();
}

/**
 * Update UI with profile data
 * @param {*} profile profile json data
 */
function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").innerHTML = '';
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}

function Profile(props) {
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken) {
            fetchProfile(accessToken)
                .then(profileObject => populateUI(profileObject));
        }
    });

    return (
        <div style={{textWrap: "pretty", textAlign: "center"}}>
            <h1><em>web</em>Musik</h1>
            <h3>Your profile data</h3>

            <section id="profile">
                <h2>Logged in as <span id="displayName"></span></h2>
                <div id="avatar"></div>
                <ul style={{
                    listStyleType: "none"
                }}>
                    <li>User ID: <span id="id"></span></li>
                    <li>Email: <span id="email"></span></li>
                    <li>Spotify URI: <a id="uri" href="#"></a></li>
                    <li>Link: <a id="url" href="#"></a></li>
                    <li>Profile Image: <span id="imgUrl"></span></li>
                </ul>
                
            </section>
        </div>
    );
}

export default withAuth(Profile);