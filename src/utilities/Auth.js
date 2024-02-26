export const clientId = process.env.REACT_APP_CLIENT_ID;
export const _callbackAddr = "https://webMusik.web.app/callback";
export const callbackAddr = "http://localhost:3000/callback";

/**
 * Requesting client access token
 * @param {*} client_id spotify client id
 * @param {*} client_secret spotify client secret
 * @returns promise with response
 */
export async function reqAccessToken(client_id, client_secret) {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    const response = await fetch(url, {
        headers,
        method: 'POST',
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    });

    return response;
}


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

    const resultJson = await result.json();

    return resultJson;
}

/**
 * 
 * @param {*} clientId client id
 * @param {*} code this code is provided by spotify when user logs in
 * @param {*} verifier the verifier generated when user initially asked to login
 * @returns the resulting json from refresh
 */
export async function refreshAccessToken(clientId, code, verifier) {
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

    const resultJson = await result.json();

    return resultJson;
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
    params.append("scope", "user-read-private user-read-email playlist-read-private user-library-read app-remote-control streaming");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    // go to the authorization page :) after which spotify will redirect to the callback link
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * the one that does the login procedure
 */
export function loginWithSpotify() {
    const verifier = generateCodeVerifier(128);
    localStorage.setItem("verifier", verifier);

    redirectToAuthCodeFlow(clientId, verifier)
    .then(() => {
        console.log('done authorizing');
    });
}

