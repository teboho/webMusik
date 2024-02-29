import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../providers/authProvider/contexts";
import { clientId, getAccessToken, loginWithSpotify } from "../../pages/Profile";
import withAuth from "../../hocs/withAuth";
import { Button, Carousel, Flex, List } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import  InfiniteScroll from "react-infinite-scroll-component";
import Playlist from "../Playlist";
import { Link } from "react-router-dom";
import { featuredDivStyle, featuredH3Style, homeStyle } from "./HomeStyles";

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        console.log("Searing for featured lists");
        const accessToken = localStorage.getItem("accessToken");
        const url = "https://api.spotify.com/v1/browse/featured-playlists";
        const headers = {
            "Authorization": "Bearer " + accessToken
        };

        if (accessToken === null || accessToken === undefined) {
            return;
        }

        fetch(url, {
            headers
        }).then(res => res.json())
        .then(data => {
            console.log("Featured......");
            console.log(data);
            setFeatured(data.playlists.items);
        })
        .catch(err => {
            console.log("Could not get featured playlists");
        });
    }, []);

    const onChange = (currentSlide) => {
        console.log(currentSlide);
        setCurrentSlide(currentSlide);
    };

    const currentSlideMemo = useMemo(() => {
        console.log(currentSlide);
        return currentSlide;
    }, [currentSlide]);
    const featuredPlaylistsMemo = useMemo(() => {
        return featured;
    }, [featured]);

    const featuredPlaylists = useMemo(() => {
        return featured.map((item, index) => 
            (<div key={`playlist_${index}`} style={featuredDivStyle}>
                <h3 style={{background: `url(${item.images[0].url})`,
                    ...featuredH3Style
                    }} 
                >
                    <Link to={`/ViewPlaylist?id=${item.id}`}>{item.name}</Link>    
                </h3>
                {/* <p>{item.description}</p> */}
            </div>)
        );
    });
    return (
        <div style={homeStyle}>
            <div className="lastPlayed">
                <h2>Featured</h2>
                <Carousel afterChange={onChange} >
                    {featuredPlaylists}
                </Carousel>
            </div>
        </div>
    )
}

/**
 * Wrapping this component with the hoc withAuth so it's only accessible by logged in users
 */
export default withAuth(Home);