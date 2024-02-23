import { useEffect, useMemo, useState } from "react";
import withAuth from "../hocs/withAuth"

function ViewPlaylist() {
    const [tracks, setTracks] = useState([]); //songs
    const queryString = new URLSearchParams(window.location.search);
    const id = queryString.get('id');
    const accessToken = localStorage.getItem('acccessToken')
    
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    useEffect(() => {
        // get client_cred access token
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", clientId);
        params.append("client_secret", clientSecret);

        fetch(
            "https://accounts.spotify.com/api/token", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body : params
            }
        )
        .then(resp => resp.json())
        .then(tokenObj => {     
            // fetching the playlist data
            const url = encodeURI(`https://api.spotify.com/v1/playlists/${id}`);
            const headers = {
                "Authorization": "Bearer " + tokenObj.access_token
            };

            return fetch(url, { headers })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data.tracks.items);
            setTracks(prev => data.tracks.items);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const stateTracks = useMemo(() => {
        return tracks;
    })

    return (
        <>
            <h1>{id}</h1>
            {stateTracks.map(song => <li>{song.track.name}</li>)}
        </>
    )
}

export default withAuth(ViewPlaylist);