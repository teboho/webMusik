import React, { useState, useEffect, useMemo, useContext } from 'react';
import withAuth from '../hocs/withAuth';
import { StepBackwardFilled, StepForwardFilled, PlayCircleFilled, PauseCircleFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Avatar, Card, Image, Button, Spin, List, Form, Input, Drawer, message, Skeleton, Slider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import  InfiniteScroll from "react-infinite-scroll-component";
import { AuthContext } from '../providers/authProvider/contexts';
import { playerButtonStyle } from './player/styles';

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
    const [currentComments, setCurrentComments] = useState([]);
    const [open, setOpen] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [queue, setQueue] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [volume, setVolume] = useState(30);
    const {authState} = useContext(AuthContext);

    const accessToken = localStorage.getItem("accessToken");
   
    useEffect(() => {
        const url = "https://api.spotify.com/v1/me/player";
        const playerState = fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            console.log(res);
            if (res.status === 204) { // no player
                return {};
            } else if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data.item === undefined) {
                
            } else {
                console.log(data.item);
                // we get the song
                const url = `https://api.spotify.com/v1/tracks/${data.item.id}`;
                return fetch(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    if (data) {
                        setTrack(data)
                    }
                })
            }
        })
        
        
    }, [isActive])

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
                const btnControl = document.getElementById('btnControl');
                if(btnControl){
                    btnControl.style.display = "inline";
                }
                
                // this pirce of code will load the player onto the page instead of relying on the button click like before
            //     const headers = {
            //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
            //         "Content-Type": "application/json"
            //     };
            //     const url = "https://api.spotify.com/v1/me/player";
            //     fetch(url, {
            //         headers,
            //         method: "PUT",
            //         body: JSON.stringify({
            //             "device_ids": [device_id],
            //             play: true
            //         })
            //     }).then(resp => {
            //         console.log(JSON.stringify(resp));
            //     }).catch(err => {
            //         console.log(err);
            //     });
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

    // getting comments
    const getComments = () => {
        console.log(current_track);
        // We will pull the relevant comments of this track from the backend 
        const url = "http://localhost:5101/api/Comments/GetByTrack/" + current_track?.id; 
        fetch(url)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.status > 400) {
                    setCurrentComments(prev => []);
                } else {
                    setCurrentComments(data);
                }
            })
            .catch(err => console.log(err));
    };
    useEffect(getComments, [current_track]);

    useEffect(() => {
        if (!currentComments) {
            return;
        }
        // we need to get the profiles
        currentComments.forEach((currComment, i) => {
            const url = "https://api.spotify.com/v1/users/" + currComment.userId;
            fetch(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then(data => data.json())
            .then((data) => {
                console.log(data);
                currComment.name = data.display_name;
            })
        })
    }, [currentComments]);

    useEffect(() => {
        const url = "https://api.spotify.com/v1/me/player/queue";
        const playerState = fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            if (res.status === 204) { // no player
            console.log(res);
                return {};
            } else if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            console.log("Your queue");
            console.log(data);
            setQueue([]);
            setQueue(data.queue);
        })
        .catch(err => {
            console.log("Could not get the queue :(");
        })
    }, [current_track])

    const currentTrackName = useMemo(() => {
        return current_track?.name;
    }, [current_track]);
    const currentTrackId = useMemo(() => {
        return current_track?.id;
    }, [current_track]);
    const currentArtistName = useMemo(() => {
        return current_track?.artists[0].name;
    }, [current_track]);
    const currentTrackArt = useMemo(() => {
        return current_track?.album.images[0].url;
    }, [current_track]);
    const currentMemoComments = useMemo(() => {
        return currentComments;
    }, [currentComments]);
    const currentQueue = useMemo(() => {
        return queue;
    }, [queue]);

    const handleChange = e => {
        setCommentText(prev => e.target.value);
    };
    
    const customMessage = (message) => {
        messageApi.info(message);
    };

    const postComment = e => {
        // we can get the user Id from the context provider...
        // date will be saved in the back
        const body = JSON.stringify({
            trackId: currentTrackId,
            commentText,
            userId: `${authState.profile.id}`,
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
        .then(response => {
            if (199 < response < 300) {
                // get new comments
                getComments();
                customMessage("Posted your comment");
                setCommentText('');
            }
            response.json()
        })
        .then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    };

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
            if (resp.status > 400){
                customMessage("There is no song to go back to!");
                console.log(resp);
            }
            return resp.json();
        })
        .catch(err => {
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
        if (deviceId.length === 0) {
            // alert('Did not get permissions. Reload and try again.');
            customMessage("Did not get permissions. Reload and try again.")
            return;
        };

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
    const play = uri => {
        console.log(uri);
        // if (deviceId.length === 0) return;

        // const headers = {
        //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
        //     "Content-Type": "application/json"
        // };
        // const url = "https://api.spotify.com/v1/me/player";
        // fetch(url, {
        //     headers,
        //     method: "PUT",
        //     body: JSON.stringify({
        //         "context_uri": [deviceId],
        //         play: true
        //     })
        // }).then(resp => {
        //     console.log(JSON.stringify(resp));
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    const playOrPause = useMemo(() => {
        return isPaused 
            ? 
            <PlayCircleFilled style={playerButtonStyle} key={"play"} onClick={resumePlayback} /> 
            : 
            <PauseCircleFilled style={playerButtonStyle} key={"pause"} onClick={pausePlayback} />;
    }, [isPaused]);

    const volumeChange = vol => {
        console.log("Volume change complete");
        console.log(vol);
        setVolume(prev => vol);
    }
    const volumeChangeComplete = vol => {
        console.log("Volume change complete");
        console.log(vol);
        setVolume(prev => vol);

        // change spotify volume
        const url = "https://api.spotify.com/v1/me/player/volume?";
        const searchParams = new URLSearchParams();
        searchParams.append("volume_percent", 50)
        fetch(url + searchParams.toString(), {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(resp => {
            if (199 < resp.status < 300) {
                customMessage("Volume changed")
            } else if (resp.status > 400) {
                customMessage("Try later")
            }
        });
    }

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
                    borderRadius: 4
                }}>
                    <Spin />
                </div>
                <Button onClick={pullControl} id='btnControl' style={{display: 'none'}}>Play on<em> web</em>Musik</Button>
                <p>or You can transfer your playback using your spotify app on your mobile app</p>
            </div>
        );
    } else {
        // document.body.style.background = `url(${currentTrackArt}) cover no-repeat fixed`
        // I need to show the queue on here
        const QueueDrawer = props => (<Drawer title="Queue" onClose={() => setOpen(false)} open={open}>
            <div className="playlistContent" id="scrollableDiv" style={{
                height: 400,
                width: "300",
                overflow: "auto",
                padding: '0 16px',
                margin: "0 auto",
                border: '1px solid rgba(140, 140, 140, 0.35)'
            }}>
                <InfiniteScroll 
                    dataLength={currentQueue.length}>
                <List 
                    dataSource={currentQueue}
                    renderItem={track => (
                        <List.Item key={track.id}>
                            <List.Item.Meta 
                                avatar={<Avatar src={track.album.images[1].url} />}
                                title={track.name}
                                description={track.artists[0].name}
                            />
                            <div><Button icon={<PlayCircleOutlined />} oncClick={() => play(track.uri)}>Play</Button></div>
                        </List.Item>
                    )}
                />
                </InfiniteScroll>
            </div>
        </Drawer>);
        const CommentsDrawer = props => (
            <Drawer title="Comments" placement='bottom' keyboard onClose={() => setOpenComments(false)} open={openComments}>
                <ErrorBoundary fallback={<p>There's a problem getting the comments!!</p>}>
                    <h2>Comments</h2>
                    <List
                        style={{
                            borderTop: "1px solid",
                            width: 300,
                            margin: "0 auto"
                        }}
                        itemLayout="horizontal"
                        dataSource={currentMemoComments}
                        renderItem={(item, index) => (
                        <List.Item
                            style={{width: 300, margin: '0 auto'}}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={<p>{item.posted} | {item.name}</p>}
                                description={item.commentText}
                            />
                        </List.Item>
                        )}
                    />
                </ErrorBoundary>
            </Drawer>
        );

        return (
            <div style={{textAlign: "center"}}>
                {contextHolder}
                {/* <h1><em>web</em>Musik</h1> */}
                
                <Card
                    style={{ 
                        width: 360, margin: "5px auto", 
                        background: "rgb(255,251,244)",
                        background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)",
                        "-webkitbox-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)",
                        "-moz-box-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)",
                        "box-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)"
                    }}
                    styles={{
                        "actions": {
                            background: "rgb(255,251,244)",
                            background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)" 
                        }                        
                    }}
                    cover={
                        <Image 
                            src={currentTrackArt}
                            alt='current playing track cover art'
                        />
                    }
                    actions={[
                        <StepBackwardFilled style={playerButtonStyle} key={"previous"} onClick={skipToPrevious} />,
                        playOrPause,
                        <StepForwardFilled style={playerButtonStyle} key={"next"} onClick={skipToNext} />,
                    ]}
                    
                >
                    <Card.Meta 
                        // avatar={<Avatar src={current_track.album?.images[2].url} />}
                        title={currentTrackName}
                        description={currentArtistName}
                    />
                </Card>
                <div className='volumeSlider' style={{position: "absolute", top: 50, float: "left", height: 300}}>
                    <Slider vertical={true}
                        min={0}
                        max={100}
                        defaultValue={30}
                        onChange={volumeChange}
                        onChangeComplete={volumeChangeComplete}
                    />
                </div>
                {/* Progressbar */}
                {/* Comments */}
                <Button onClick={() => setOpen(true)}>Show Queue</Button>
                <Button onClick={() => setOpenComments(true)}>Show Comments</Button>
                <Form autoFocus={true}>
                    <Form.Item id='inputComment' label="Add a comment" style={{width: "300px", margin: "0 auto"}}>
                        <Input.TextArea rows={3} placeholder='Comments...?' value={commentText} onChange={handleChange} />
                    </Form.Item>
                    <Button type='default' onClick={postComment}>
                        Post comment
                    </Button>
                </Form>
                <QueueDrawer />
                <CommentsDrawer />
            </div>
        );
    }
}

export default withAuth(WebPlayer);