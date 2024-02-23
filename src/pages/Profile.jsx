import { useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { loginReducer } from "../providers/authProvider/reducers";
import { loginAction } from "../providers/authProvider/actions";
import withAuth from "../hocs/withAuth";

export const clientId = process.env.REACT_APP_CLIENT_ID;
export const callbackAddr = "http://boxi-fi.web.app/callback";

/**
 * 
 * @param {*} codeVerifier the limited length string of characters
 * @returns an encoded form of the codeVerifier
 */
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const chall =  btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '-')
        .replace(/=+$/, '');
    
    return chall;
}

/**
 * make random string made up of length possible characters
 * @param {*} length length of the code verifier
 * @returns a string of length characters
 */
export function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // make random string made up of length possible characters
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

/**
 * Get access token for code
 * Making sure the token exchange works
 * @param {*} clientId client id
 * @param {*} code the authorization code from the code challenge :)
 */
export async function getAccessToken(clientId, code, verifier) {
    // we use the same verifier we used to generate the code :)
    // const verifier = localStorage.getItem("verifier");
    console.log("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", callbackAddr);
    params.append("code_verifier", verifier);
    // params.append("scope", "playlist-read-private");

    console.log(params);

    // making the request for the access token :)
    const result = await fetch(
        "https://accounts.spotify.com/api/token", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : params
        }
    );

    const { access_token } = await result.json();
    return access_token;
}

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

 /**
     * Redirect to Spotify authorization page
     * @param {*} clientId spotify client id
     */
 export async function redirectToAuthCodeFlow(clientId, verifier) {
    console.log("Calling to auth");
    const challenge = await generateCodeChallenge(verifier);

    console.log("verifier", verifier);
    
    // saving the verifier to the session storage
    localStorage.setItem("verifier", verifier);
    
    // setup http query string :)
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", callbackAddr);
    params.append("scope", "user-read-private user-read-email playlist-read-private user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    // go to the authorization page :) after which spotify will redirect to the callback link
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function loginWithSpotify() {
    const verifier = generateCodeVerifier(128);
    localStorage.setItem("verifier", verifier);

    redirectToAuthCodeFlow(clientId, verifier)
    .then(() => {
        console.log('done authorizing');
    });
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
        <>
            <h1>Your profile data</h1>

            <section id="profile">
                <h2>Logged in as <span id="displayName"></span></h2>
                <div id="avatar"></div>
                <ul>
                    <li>User ID: <span id="id"></span></li>
                    <li>Email: <span id="email"></span></li>
                    <li>Spotify URI: <a id="uri" href="#"></a></li>
                    <li>Link: <a id="url" href="#"></a></li>
                    <li>Profile Image: <span id="imgUrl"></span></li>
                </ul>
                
            </section>
        </>
    );
}

export default withAuth(Profile);