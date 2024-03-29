import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Select, Image, Flex, List, Avatar, message, Skeleton } from "antd";
import { SearchOutlined, PlusOutlined, PlayCircleOutlined } from "@ant-design/icons";
import reqAccessToken from "../utilities/Auth";
import SongItem from "./SongItem";
import withAuth from "../hocs/withAuth";
import  InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState("");
    // const [searchType, setSearchType] = useState("track");
    const [tracks, setTracks] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const accessToken = localStorage.getItem("accessToken");

    const memoTracks = useMemo(() => {
        return [...tracks];
    }, [tracks]);
    
    const customMessage = (message) => {
        messageApi.info(message);
    }
    
    const addToQueue = uri => {
        if (uri === null || uri === undefined) {
            customMessage("Please try again");
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
            if (199 < resp.status < 300) {
                customMessage("Added to queue!")
            } else if (resp.status === 404) {
                customMessage("You can only add to queue if something is already playing!")
            }
        })
        .catch(err => console.log(err))
    }

    async function handleSubmit(event) {
        if (loading) {
            return;
        }
        setLoading(true);
        console.log(searchName + ", track")

        if (accessToken.length === 0) {
            console.log("Get access token!!!!!!")
            return;
        }

        // genre, track, artist
        let query = "q=" + searchName + "&type=track";

        const url = encodeURI("https://api.spotify.com/v1/search?" + query);
        const headers = {
            "Authorization": "Bearer " + accessToken
        };

        fetch(url, {
            headers
        }).then(res => res.json())
        .then(data => {
            console.log(data.tracks.items);
            setTracks(prev => data.tracks.items);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 150);
            setLoading(false);
        })
        .catch(err => {
            console.log("There was an error searching");
        });
    }

    function handleChange(e) {
        console.log(e.target.value);
        setSearchName(e.target.value);
    }

    // function handleSelect(event) {
    //     console.log(event);
    //     setSearchType(event);
    // }

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

    return (
        <>        
            {contextHolder}

            <Form 
                onFinish={handleSubmit}
                className=""
                name="search"
                style={{ maxWidth: 600, padding: "20px", margin: "10px auto", borderRadius: "25px",
                    "-webkitbox-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)",
                    "-moz-box-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)",
                    "box-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)"
                }}
                autoComplete="off">
                <Form.Item
                    label="songname"
                    name="songname"
                    required="true"
                >
                    <Input required onChange={handleChange}/>
                </Form.Item>
                <Form.Item
                >
                    <Button type="primary" block htmlType="submit" shape="default"icon={<SearchOutlined />}>Search</Button>
                </Form.Item>
            </Form>

            <div className="playlistContent" id="scrollableDiv" style={{
                height: 400,
                width: "75vw",
                overflow: "auto",
                padding: '0 16px',
                margin: "0 auto",
                border: '1px solid rgba(140, 140, 140, 0.35)'
            }}>
                <InfiniteScroll 
                    dataLength={memoTracks.length}
                    loader={
                        <Skeleton 
                            paragraph={{
                                rows: 1
                            }}
                        />
                    }    
                >
                    <List 
                        dataSource={memoTracks}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta 
                                    avatar={<Avatar src={item.album.images[0].url} />}
                                    title={item.name}
                                    description={item.artists[0].name}
                                />
                                <div><Button icon={<PlayCircleOutlined />} onClick={() => play(item.uri)} data-uri={`${item.id}`}>Play now</Button></div>
                                <div><Button icon={<PlusOutlined />} onClick={() => addToQueue(item.uri)} data-uri={`${item.id}`}>Add to Que</Button></div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>

        </>
    );
}

export default withAuth(Search);