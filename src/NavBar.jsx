import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

// Menu items
const menuItems = [
    {
        label: <Link to="/">Home</Link>,
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

function NavBar() {
    return (
        <Menu items={menuItems} mode="horizontal" title="webMusik" style={
            {
                fontWeight: "bold",
                background: "rgb(215,211,210)",
                background: "linear-gradient(90deg, rgba(215,211,210,1) 0%, rgba(222,150,34,1) 35%, rgba(224,64,5,1) 100%)"
            }
        }/>
    );
}

export default NavBar;