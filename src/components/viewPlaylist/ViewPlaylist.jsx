import { useEffect, useMemo, useState } from "react";
import withAuth from "../../hocs/withAuth"
import SongItem from "../../pages/SongItem";
import { Avatar, Divider, Skeleton, Flex, List, Button, message, Card } from "antd";
import { PlusOutlined, PlayCircleOutlined } from "@ant-design/icons";
import  InfiniteScroll from "react-infinite-scroll-component";
import { scrollListStyle } from "./viewPlaylistStyles";

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
    const [playlistObj, setPlaylistObj] = useState([]); //songs
    const queryString = new URLSearchParams(window.location.search);
    const id = queryString.get('id');
    const [messageApi, contextHolder] = message.useMessage();
    const [image, setImage] = useState('');

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
            setPlaylistObj(prev => ({...data}))
            console.log("All playlist info");
            console.log(data);
            if (data.images) {
                setImage(data.images[0].url);
            }
            console.log("the tracks are here");
            console.log(data.tracks.items);
            setTracks(prev => data.tracks.items);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const memoTracks = useMemo(() => {
        return [...tracks];
    }, [tracks]);

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
            if (200 < resp.status < 300) {
                success();
            } else if (resp.status === 404) {
                customMessage("You can only add to queue if something is already playing!")
            }
        })
        .catch(err => console.log(err))
    }

    
    /**
     * 
     * @param {*} uri specific song uri
     */
    const play = uri => {
        const url = "https://api.spotify.com/v1/me/player/play";
        // const searchParams = new URLSearchParams();
        // searchParams.append("device_id", device_id);
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json"
        };
        fetch(url, {
            headers,
            method: "PUT",
            body: JSON.stringify({
                uris: [uri]
            })
        }).then(() => {
            customMessage("Playing your song");
        }).catch(err => console.log("Could not play new testament"));
    }

    const scrollList = (
        <div className="playlistContent" id="scrollableDiv" style={scrollListStyle}>
             <InfiniteScroll 
                dataLength={tracks.length}>
                    {/* {console.log(tracks.length)} */}
                <List 
                    dataSource={tracks}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta 
                                avatar={item.track === null ? null : <Avatar src={item.track.album.images[0].url} />}
                                title={item.track === null ? null : item.track.name}
                                description={item.track === null ? null : item.track.artists[0].name}
                            />
                            <div><Button icon={<PlayCircleOutlined />} onClick={() => play(item.track.uri)} data-uri={`${item.id}`}>Play now</Button></div>
                            <div><Button icon={<PlusOutlined />} onClick={() => addToQueue(item.track.uri)}>Add to queue</Button></div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );

    return (
        <div style={{textAlign: "center"}}>
            <div className="playlistHeader" style={{
                backdropFilter: "blur(10px)",
                background: `url(${image ? image : ''})`,
                color: "white",
                minHeight: 200
            }}>
                <h1>{playlistObj.name}</h1>
                <p>{playlistObj.description}</p>
            </div>
            
            {contextHolder}
                        
            {scrollList}
        </div>
    )
}

export default withAuth(ViewPlaylist);