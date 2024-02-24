import React from "react";
import { Link } from "react-router-dom";
import {Card, Image, Typography, Flex, Button } from "antd";
import { Meta } from "antd/es/list/Item";

const cardStyle = {
    width: 300
};

const SongItem = (props) => {
    return (
        <Card
            title={props.name}
            hoverable
            style={cardStyle}
            styles={{
                body: {
                    padding: 0,
                    overflow: "hidden",
                    background: "rgb(215,211,210)",
                    background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)"
                }, 
                header: {
                    background: "rgb(215,211,210)",
                    background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)"                }
            }}
            cover={ <Image src={props.images.url} alt="album-art"/> }
        >
            <Meta
                title=""
                description={
                    <audio controls>
                        <source src={props.preview_url} type="audio/mpeg" />
                    </audio>}
            />
            <p>Artist(s): {" "}
                {
                props.artists.map((artist, i) => {
                    return (
                        <span key={"artist_" + i} >{i > 0 ? ", " : null}{artist.name}</span>
                    );
                })
            }
            </p>
            <Button type="primary" href={props.href} target="_blank">
                Play on Spotify
            </Button>
        </Card>
    );
}

export default SongItem;