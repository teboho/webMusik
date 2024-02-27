import { useEffect, useMemo, useState } from "react";
import withAuth from "../hocs/withAuth"
import SongItem from "./SongItem";
import { Avatar, Divider, Skeleton, Flex, List, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import  InfiniteScroll from "react-infinite-scroll-component";

/**
 * Track shape and default...
 */
const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function ViewPlaylist() {
    const [loading, setLoading] = useState(false);
    const [tracks, setTracks] = useState([]); //songs
    const [playlistInfo, setPlaylistInfo] = useState({}); //songs
    const [playlistObj, setPlaylistObj] = useState([]); //songs
    const queryString = new URLSearchParams(window.location.search);
    const id = queryString.get('id');
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        // fetching the playlist data
        const url = encodeURI(`https://api.spotify.com/v1/playlists/${id}`);
        const headers = {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        };

        fetch(url, { headers })
        .then(data => data.json())
        .then(data => {
            setPlaylistObj(prev => data)
            console.log("All playlist info");
            // console.log(data);
            // setPlaylistInfo(data);
            console.log("the tracks are here");
            console.log(data.tracks.items);
            setTracks(prev => data.tracks.items);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const memoTracks = useMemo(() => {
        return tracks;
    })

    const success = () => {
        messageApi.info('Added to queue');
    }
    const fail = () => {
        messageApi.info('Added to queue');
    }
    const customMessage = (message) => {
        messageApi.info(message);
    }

    const addToQueue = uri => {
        console.log(uri);
        if (uri === null || uri === undefined) {
            customMessage("Did not add. Please try again later!");
            return;
        }
        const url = "https://api.spotify.com/v1/me/player/queue?";
        const searchParams = new URLSearchParams();
        searchParams.append("uri", uri);
        fetch(url + searchParams.toString(), {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(resp => {
            console.log(resp);
            if (resp.status === 204) {
                success();
            }
        })
            .catch(err => console.log(err))
    }

    return (
        <div style={{textAlign: "center"}}>
            <div className="playlistHeader">
                <h1>{playlistObj.name}</h1>
            </div>

            {contextHolder}
                        
            <div className="playlistContent" id="scrollableDiv" style={{
                height: 400,
                width: "75vw",
                overflow: "auto",
                padding: '0 16px',
                margin: "0 auto",
                border: '1px solid rgba(140, 140, 140, 0.35)'
            }}>
                <InfiniteScroll 
                    dataLength={memoTracks.length}>
                <List 
                    dataSource={memoTracks}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta 
                                avatar={<Avatar src={item.track.album.images[0].url} />}
                                title={item.track.name}
                                description={item.track.artists[0].name}
                            />
                            <div><Button icon={<PlusOutlined />} onClick={() => addToQueue(item.track.uri)}>Add to queueu</Button></div>
                        </List.Item>
                    )}
                />
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default withAuth(ViewPlaylist);