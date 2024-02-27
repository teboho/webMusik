import React, { useEffect, useMemo, useState } from 'react';
import withAuth from '../hocs/withAuth';
import Playlist from '../components/Playlist';
import { fetchProfile } from './Profile';
import { Avatar, List, Space, Card, Flex } from 'antd';

/**
 * this page will show all the user's playlists
 * @param {*} props component props
 */
function Playlists(props) {
    const [state, setState] = useState({});
    const accessToken = localStorage.getItem("accessToken");
    
    const publicList = "https://api.spotify.com/v1/users/${id}/playlists";
    const privateList = "https://api.spotify.com/v1/me/playlists";
    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        fetchProfile(accessToken)
            .then(profile => {
                localStorage.setItem("id", profile.id);
                return profile.id;
            })
            .then(id => {
                // fetching the playlist data
                const url = encodeURI(privateList);
                const headers = {
                    "Authorization": "Bearer " + accessToken
                };
                return fetch(url, { headers });
            })
            .then(data => data.json())
            .then(data => {
                setState(prev => data);
                console.log(data);
                
                setPlaylists(data.items);
            })
            .catch(err => console.log(err));
    }, []);
 
    const playLists = useMemo(() => {
        return playlists?.map((item, index) => <Playlist key={`playlist_${index}`} item={{...item}} />);
    });

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Playlists</h1>
            <Flex wrap='wrap' gap="small" style={{
                alignItems: "center",
                justifyContent: "center"
            }}>
                {playLists}
            </Flex>
        </>
    );
}

export default withAuth(Playlists);