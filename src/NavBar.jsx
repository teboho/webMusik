import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

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
    {
        label: <Link to="profile">Profile</Link>,
        key: "profile"
    },
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
    const token = localStorage.getItem("accessToken");

    return (
        <Menu items={ (token === undefined || token === null) ? offMenuItems : menuItems} 
            mode="horizontal" title="webMusik" 
            style={{
                fontWeight: "bold",
                background: "rgb(255,251,244)",
                background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)"
            }}            
        />
    );
}

export default NavBar;