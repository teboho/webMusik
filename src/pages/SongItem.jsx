import React from "react";
import { Link } from "react-router-dom";
import {Card} from "antd";

const SongItem = (props) => {
    return (
        <Card
            title={props.title}
            extra={<Link to={props.artistLink}>{props.artist}</Link>}
        >
            <p>{props.album}</p>
            <p>{props.releaseDate}</p>
        </Card>
    );
}

export default SongItem;