import { useEffect } from "react";
import { useState } from "react";

export default function Profile(props) {
    console.log("Starting");
    const [state, setState] = useState({});

    useEffect(() => {
        console.log(state);
    }, [state])

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const code = undefined;

    /**
     * 
     * @param {*} codeVerifier the limited length string of characters
     * @returns an encoded form of the codeVerifier
     */
    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        const chall =  btoa(String.fromCharCode(...new Uint8Array(digest)))
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
    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // make random string made up of length possible characters
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    /**
     * Redirect to Spotify authorization page
     * @param {*} clientId spotify client id
     */
    async function redirectToAuthCodeFlow(clientId) {
        console.log("Calling to auth");
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        console.log("challenge...", challenge);
        debugger

        // saving the verifier to the local storage
        localStorage.setItem("verifier", verifier);

        // setup http query string :)
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:3000/profile");
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        // go to the authorization page :) after which spotify will redirect to the callback link
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    /**
     * Get access token for code
     * Making sure the token exchange works
     * @param {*} clientId client id
     * @param {*} code the authorization code from the code challenge :)
     */
    async function getAccessToken(clientId, code) {
        // we use the same verifier we used to generate the code :)
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "https://localhost:3000/profile");
        params.append("code_verifier", verifier);

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
        console.log(access_token);
        setState(prev => ({
            ...prev, 
            accessToken: access_token
        }))
        return access_token;
    }

    /**
     * Call Web API
     * @param {*} token api access token
     */
    async function fetchProfile(token) {
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

    // we check if there isn't an existing code we can use, to prevent a redirect loop...
    if (!code) {
        console.log("no code atm -> ", code);
        redirectToAuthCodeFlow(clientId);
    } else {
        console.log("code is here -> ", code);
        debugger
        getAccessToken(clientId, code)
            .then((data) => {
                console.log("got access", data);
                debugger
            })
            .catch(err => {
                console.log(err);
            });
        // const profile = await fetchProfile(accessToken);
        // console.log("profile", profile);
        // populateUI(profile);
    }

    return (
        <>
            <h1>Your Spotify profile data</h1>

            <section id="profile">
                <h2>Logged in as <span id="displayName"></span></h2>
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