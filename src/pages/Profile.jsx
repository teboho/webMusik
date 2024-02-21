import { useEffect } from "react";
import { useState } from "react";

const clientId = process.env.REACT_APP_CLIENT_ID;
let code = undefined;

export default function Profile(props) {
    console.log("Starting");
    const [state, setState] = useState({});

    useEffect(() => {    
        /**
         * We understand that the callback activity from spotify will bring a code query parameter...
         * and so we want to read that so we can start working with it for actual calls
         */
        const queryString = new URLSearchParams(window.location.search);
        const theCode = queryString.get('code');

        if (theCode) {
            code = theCode;
        } else {
            code = undefined;
        }

        getProfile()
        .then(data =>{
            console.log("incoming----------------------");
            console.log(data);
            
            populateUI(data);
        })
        .catch(err => console.log(err));
    }, []);

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
        params.append("redirect_uri", "http://localhost:3000/profile");
        params.append("code_verifier", verifier);

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
    async function getProfile() {
        if (!code) {
            // console.log("no code atm -> ", code);
            await redirectToAuthCodeFlow(clientId);
            // return;
        } else {
            console.log("code is already here -> ", code);
            console.log("and the clientId", clientId);
            console.log("verifier", localStorage.getItem("verifier"));
            const accessToken = await getAccessToken(clientId, code);
            
            if (accessToken)
            {
                console.log("got token in the else:", accessToken);
                const profile = await fetchProfile(accessToken);
                console.log("profile");
                console.log(profile);
                return profile;
            } else {

            }
        }
    }

    return (
        <>
            <h1>Your Spotify profile data</h1>

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