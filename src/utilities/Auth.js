// Auth request

/**
 * Requesting access token
 * @param {*} client_id spotify client id
 * @param {*} client_secret spotify client secret
 * @returns promise with response
 */
async function reqAccessToken(client_id, client_secret) {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    const response = await fetch(url, {
        headers,
        method: 'POST',
        body: `grant-type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    });

    return response;
}

export default ReqAccessToken; 