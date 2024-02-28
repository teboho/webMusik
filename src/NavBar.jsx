import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Flex, Form, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "./providers/authProvider/contexts";
const { Search } = Input;
// Menu items
const menuItems = [
    {
        label: <Link to="/"><em>web</em>Musik</Link>,
        key: "home"
    },
    {
        label: <Link to="about">About</Link>,
        key: "about"
    },
    {
        label: <Link to="search">Search for Song</Link>,
        key: "search"
    },
    // {
    //     label: <Link to="profile">Profile</Link>,
    //     key: "profile"
    // },
    {
        label: <Link to="playlists">Playlists</Link>,
        key: "playlists"
    },
    {
        label: <Link to="WebPlayer">Play</Link>,
        key: "webplayer"
    }
];

const offMenuItems = [
    {
        label: <Link to="/"><em>web</em>Musik</Link>,
        key: "home"
    },
    {
        label: <Link to="about">About</Link>,
        key: "about"
    }
];

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchTracks, setSearchTracks] = useState([]);
    const {authState, showDrawer} = useContext(AuthContext);
    const token = localStorage.getItem("accessToken");

    const accessToken = localStorage.getItem("accessToken");
    // console.log(authState);
    
    async function onSearch(event) {
        if (loading) {
            return;
        }
        setLoading(true);
        console.log(searchText + ", " + "track")

        if (accessToken.length === 0) {
            console.log("Get access token!!!!!!")
            return;
        }

        // genre, track, artist
        let query = "q=" + searchText + "&type=" + "track";

        const url = encodeURI("https://api.spotify.com/v1/search?" + query);
        const headers = {
            "Authorization": "Bearer " + accessToken
        };

        fetch(url, {
            headers
        }).then(res => res.json())
        .then(data => {
            console.log(data.tracks.items);
            setSearchTracks(prev => data.tracks.items);
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
        setSearchText(e.target.value);
    }

    return (
        <Flex style={{
            width: "100%",
            background: "rgb(255,251,244)",
            // background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)",
        }}>
            <Menu items={ (token === undefined || token === null) ? offMenuItems : menuItems} 
                mode="horizontal" title="webMusik" 
                style={{
                    width: "90%",
                    fontWeight: "bold",
                    background: "rgb(255,251,244)",
                    // background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)",
                    // borderBottom: "1px solid"
                }}            
            />
            
            <div className="search" style={{display: "inline-block", margin: "10px 0"}}>
                <Search placeholder="input search text" onSearch={onSearch} enterButton allowClear />
            </div>
            <div style={{
                margin: "10px"
            }}>
                {authState.profile.images.length > 0 && authState.profile.images[0].url.length > 0 ? 
                    <Button onClick={() => showDrawer()} style={{ background: "rgb(255,251,244)", border: "none"}} icon={<img src={authState.profile.images[0].url} alt="profile picture" style={{width: "100%", margin: 0, borderRadius: "50%"}} />}></Button> 
                    : null
                }
            </div>
        </Flex>
    );
}

export default NavBar;