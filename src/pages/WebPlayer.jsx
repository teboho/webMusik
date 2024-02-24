import React, { useState, useEffect, useMemo } from 'react';
import withAuth from '../hocs/withAuth';
import { StepBackwardFilled, StepForwardFilled, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Avatar, Card, Image, Button, Spin } from 'antd';

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

    useEffect(() => {
        // We have to dynamically inject the player script from spotify directly into the page
        const script = document.createElement("script");
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
                document.getElementById('btnControl').style.display = "inline";
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

                console.log(JSON.stringify(state.track_window.current_track));

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

    const currentTrackName = useMemo(() => {
        return current_track?.name;
    }, [current_track]);
    const currentArtistName = useMemo(() => {
        return current_track?.artists[0].name;
    }, [current_track]);
    const currentArtistImage = useMemo(() => {
        return current_track?.artists[0].name;
    }, [current_track]);
    // const device_id = useMemo(() => deviceId, [deviceId]);

    const pausePlayback = e => {
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
    const resumePlayback = e => {
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
    const skipToPrevious = e => {
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
    const skipToNext = e => {
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
    const pullControl = (event) => {
        if (deviceId.length === 0) return;

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
                play: true
            })
        }).then(resp => {
            console.log(JSON.stringify(resp));
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

    if (!isActive) {
        return (
            <div style={{
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
                <Button onClick={pullControl} id='btnControl' style={{display: 'none'}}>Play on{" "}<em>web</em>Musik :)</Button>
            </div>
        );
    } else {
        return (
            <div style={{textAlign: "center"}}>
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
                            src={current_track.album?.images[0].url}
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
                {/* Progressbar */}
                {/* Comments */}
            </div>
        );
    }
}

export default withAuth(WebPlayer);