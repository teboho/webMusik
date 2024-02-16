import React from "react";
import { Link } from "react-router-dom";
import {Card, Image, Typography} from "antd";

const { Title }  = Typography;

const SongItem = (props) => {

    return (
        <Card
            title={props.name}
            extra={<Link to={props.artistLink}>{props.artist}</Link>}
            style={{width: "fit-content"}}
        >
            {
                props.artists.map((artist, i) => {
                    return (
                        <div key={"artist_" + i}>
                            <Title level={3}>{artist.name}</Title>
                            {
                                // console.log(artist.images)
                                <Image src={props.images.url} width={200} />
                            }
                        </div>
                    );
                })
            }
            {/* <p>{props.album}</p>
            <p>{props.releaseDate}</p> */}
        </Card>
    );
}

export default SongItem;