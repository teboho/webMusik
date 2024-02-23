import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Image, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import reqAccessToken from "../utilities/Auth";
import SongItem from "./SongItem";
import withAuth from "../hocs/withAuth";
import { loginWithSpotify } from "./Profile";

const Search = () => {
    const [searchName, setSearchName] = useState("");
    const [searchType, setSearchType] = useState("track");
    const [tracks, setTracks] = useState([]);

    const accessToken = localStorage.getItem("accessToken");

    async function handleSubmit(event) {
        console.log(searchName + ", " + searchType)

        if (accessToken.length === 0) {
            console.log("Get access token!!!!!!")
            return;
        }

        // genre, track, artist
        let query = "q=" + searchName + "&type=" + searchType;

        const url = encodeURI("https://api.spotify.com/v1/search?" + query);
        const headers = {
            "Authorization": "Bearer " + accessToken
        };

        const response = await fetch(url, {
            headers
        });

        const actual_data = await response.json();

        console.log(actual_data);

        setTracks(actual_data.tracks.items)
    }

    function handleChange(e) {
        console.log(e.target.value);
        setSearchName(e.target.value);
    }

    function handleSelect(event) {
        console.log(event);
        setSearchType(event);
    }

    return (
        <>
        <Form 
            onFinish={handleSubmit}
            className="geekblue-5"
            name="search"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, border: "1px solid", padding: "20px", margin: "10px auto", borderRadius: "25px"}}
            autoComplete="off">
            <Form.Item
                label="songname"
                name="songname"
                required="true"
            >
                <Input required onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                labelCol={{span: 4}}
                wrapperCol={{span:16}}
                label="Search type"
                name="searchType"
            >
                <Select
                    showSearch
                    placeholder="Search by ..."
                    defaultValue={{value: "songname", label: "Song name"}}
                    onSelect={handleSelect}
                    options={[
                        {
                            key: "track",
                            value: "track",
                            label: "Song name",
                        },
                        {
                            key: "artist",
                            value: "artist",
                            label: "Artist name"
                        },
                        {
                            
                            key: "track",
                            value: "genre",
                            label: "Genre"
                        },  
                    ]}
                />
            </Form.Item>
            <Form.Item
                wrapperCol="20"
            >
                <Button type="primary" block htmlType="submit" shape="default"icon={<SearchOutlined />}>Search</Button>
            </Form.Item>
        </Form>
        <Flex gap="middle" wrap="wrap" style={{alignItems: "center", justifyContent: "center"}}>
        { 
            tracks.map((track, i) => {
                return (
                    <SongItem key={"track_" + i} name={track.name} artists={track.artists} images={track.album.images[0]} href={track.external_urls.spotify} preview_url={track.preview_url} />
                );
            })
        }
        </Flex>
        </>
    );
}

export default withAuth(Search);