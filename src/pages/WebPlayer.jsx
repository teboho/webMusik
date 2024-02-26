import React, { useState, useEffect, useMemo } from 'react';
import withAuth from '../hocs/withAuth';
import { StepBackwardFilled, StepForwardFilled, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Avatar, Card, Image, Button, Spin, Form, Input, } from 'antd';
import { pausePlayback, resumePlayback, skipToNext, skipToPrevious } from '../utilities/Player';
import Comments from '../components/Comments';
import { backend_URL } from '../utilities/Auth';

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

const WebPlayer = (props) => {
    const [isPaused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [deviceId, setDeviceId] = useState('');
    const [commentText, setCommentText] = useState('');
    const [currentComments, setCurrentComments] = useState(null);

    const handleChange = e => {
        setCommentText(prev => e.target.value);
    }

    const postComment = e => {
        // date will be saved in the back
        const body = JSON.stringify({
            trackId: current_track.id,
            commentText,
            userId: `${localStorage.getItem("userId")}`,
            posted: new Date(Date.now()).toISOString()
        });
        console.log(body);
        
        const url = "http://localhost:5101/api/Comments/PostComment";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: body
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        const checkPlayer = document.getElementById("playerId");

        // We have to dynamically inject the player script from spotify directly into the page
        const script = checkPlayer ? checkPlayer : document.createElement("script");
        script.id = "playerScript";
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "webMusik",
                getOAuthToken: cb => { cb(localStorage.getItem("accessToken")) },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID-', device_id);
                setDeviceId(device_id);
                const btnControl = document.getElementById('btnControl');
                if(btnControl)
                    btnControl.style.display = "inline";
            });

            player.addListener('not_ready', ({device_id}) => {
                console.log('Device ID has gone offline', device_id);
                // we need to remove the device ...
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true);
                })
            }));

            player.connect().then(success => {
                if(success) {
                    console.log("Successfuly connected to spotify")
                }
            });
        };
    }, []);

    useEffect(() => {
        console.log(current_track);
        // We will pull the relevant comments of this track from the backend 
        const url = "http://localhost:5101/api/Comments/GetByTrack/" + current_track.id; 
        fetch(url)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.status > 400) {
                    setCurrentComments(prev => null);
                } else {
                    setCurrentComments(data);
                }
            })
            .catch(err => console.log(err));
    }, [current_track]);

    const currentTrackName = useMemo(() => {
        return current_track?.name;
    }, [current_track]);
    const currentArtistName = useMemo(() => {
        return current_track?.artists[0].name;
    }, [current_track]);
    const currentArtistImage = useMemo(() => {
        return current_track?.artists[0].name;
    }, [current_track]);
   
    const pullControl = (event) => {
        if (deviceId.length === 0) {
            alert("Not connected, try logout")    
            return;
        }

        // we need to check if there was a previous player already ...
        player.getCurrentState().then(state => console.log(state))
        
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json"
        };
        const url = "https://api.spotify.com/v1/me/player";

        fetch(url, {
            headers,
            method: "PUT",
            body: JSON.stringify({
                "device_ids": [deviceId],
                // play: true
            })
        }).catch(err => {
            console.log(err);
        })
    
    };

    const playOrPause = useMemo(() => {
        return isPaused 
            ? 
            <PlayCircleFilled key={"play"} onClick={resumePlayback} /> 
            : 
            <PauseCircleFilled key={"pause"} onClick={pausePlayback} />;
    }, [isPaused, player]);

    const commComps = currentComments ? currentComments.map((c, i) => (<li>{c.posted}|{c.commentText}</li>)) : null;

    if (!isActive) {
        return (
            <div id='host' style={{
                textAlign: "center"
            }}>
                <h1><em>web</em>Musik</h1>
                <p>Getting Permissions from Spotify</p>
                <div style={{
                    margin: "20px 0",
                    padding: "30px 50px",
                    textAlign: "center",
                    background: "rgb(115,111,210)",
                    background: "linear-gradient(90deg, rgba(115,211,210,1) 0%, rgba(122,150,34,1) 35%, rgba(124,64,5,1) 100%)",
                    borderRadius: 4,
                    fontSize: 16
                }}>
                    <Spin />
                </div>
                <p>or You can transfer your playback using your spotify app on your mobile app</p>
                <Button onClick={pullControl} id='btnControl' style={{display: 'none', 
                        background: "rgb(215,211,210)",
                        background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)",
                        fontWeight: "bold" 
                        }}
                >
                    Play on<em> web</em>Musik :)
                </Button>
            </div>
        );
    } else {
        return (
            <div id='host' style={{textAlign: "center"}}>
                <h1><em>web</em>Musik</h1>
                <Card
                    style={{ width: 360, margin: "5px auto", background: "rgb(215,211,210)",
                        background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)" 
                    }}
                    styles={{
                        "actions": {
                                background: "rgb(215,211,210)",
                                background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)" 
                        }                        
                    }}
                    cover={
                        <Image 
                            src={current_track.album.images[0].url}
                            alt='current playing track cover art'
                        />
                    }
                    actions={[
                        <StepBackwardFilled key={"previous"} onClick={skipToPrevious} />,
                        playOrPause,
                        <StepForwardFilled key={"next"} onClick={skipToNext} />,
                    ]}
                >
                    <Card.Meta 
                        avatar={<Avatar src={current_track.album?.images[2].url} />}
                        title={currentTrackName}
                        description={currentArtistName}
                    />
                </Card>
                <Form>
                    <Form.Item label="Add a comment" style={{width: "300px", margin: "0 auto"}}>
                        <Input.TextArea rows={3} placeholder='Comments...?' onChange={handleChange} />
                    </Form.Item>
                    <Button type='default' onClick={postComment}>
                        Post comment
                    </Button>
                </Form>
                {/* <h1>{current_track.id}</h1> */}
                <ul>
                    {commComps}
                </ul>
            </div>
        );
    }
}

export default withAuth(WebPlayer);