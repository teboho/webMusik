import React from "react";
import { Link } from "react-router-dom";
import {Card, Image, Typography, Flex, Button } from "antd";
import { Meta } from "antd/es/list/Item";
import { CheckCircleTwoTone } from "@ant-design/icons"

const cardStyle = {
    width: 300
};

const SongItem = (props) => {
    const addToQueue = e => {
        const url = "https://api.spotify.com/v1/me/player/queue?";
        const searchParams = new URLSearchParams();
        searchParams.append("uri", props.track.uri);
        fetch(url + searchParams.toString(), {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(data => console.log(data))
            .catch(err => console.log(err))
    }

    return (
        <Card
            title={props.track.name}
            hoverable
            style={cardStyle}
            styles={{
                body: {
                    padding: 0,
                    overflow: "hidden",  background:" rgb(255,251,244)",
                    background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)"
                }, 
                header: {
                    overflow: "hidden",  background:" rgb(255,251,244)",
                    background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)"
                }
            }}
            cover={ <Image src={props.track.album.images[0].url} alt="album-art"/> }
        >
            <Meta
                title=""
                description={
                    <audio controls>
                        <source src={props.track.preview_url} type="audio/mpeg" />
                    </audio>}
            />
            <p>Artist(s): {" "}
                {
                props.track.artists.map((artist, i) => {
                    return (
                        <span key={"artist_" + i} >{i > 0 ? ", " : null}{artist.name}</span>
                    );
                })
            }
            </p>
            <Button type="primary" onClick={addToQueue} dataUri={props.track.uri}>
                Add to que
            </Button>
            {/* <CheckCircleTwoTone twoToneColor="#52c41a" /> */}
        </Card>
    );
}

export default SongItem;