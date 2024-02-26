export const pausePlayback = e => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
    };
    const url = "https://api.spotify.com/v1/me/player/pause";
    fetch(url, {
        headers,
        method: "PUT"
    }).then(resp => {
        console.log(JSON.stringify(resp));
    }).catch(err => {
        console.log(err);
    })
};
export const resumePlayback = e => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
    };
    const url = "https://api.spotify.com/v1/me/player/play";
    fetch(url, {
        headers,
        method: "PUT"
    }).then(resp => {
        console.log(JSON.stringify(resp));
    }).catch(err => {
        console.log(err);
    })
};
export const skipToPrevious = e => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
    };
    const url = "https://api.spotify.com/v1/me/player/previous";
    fetch(url, {
        headers,
        method: "POST"
    }).then(resp => {
        console.log(JSON.stringify(resp));
    }).catch(err => {
        console.log(err);
    })
};
export const skipToNext = e => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
    };
    const url = "https://api.spotify.com/v1/me/player/next";
    fetch(url, {
        headers,
        method: "POST"
    }).then(resp => {
        console.log(JSON.stringify(resp));
    }).catch(err => {
        console.log(err);
    })
};
