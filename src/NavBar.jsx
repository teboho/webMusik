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
    }
];

function NavBar() {
    return (
        <Menu items={menuItems} mode="horizontal" />
    );
}

export default NavBar;