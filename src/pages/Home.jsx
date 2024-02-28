import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../providers/authProvider/contexts";
import { clientId, getAccessToken, loginWithSpotify } from "./Profile";
import withAuth from "../hocs/withAuth";
import { Button, Carousel, Flex, List } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import  InfiniteScroll from "react-infinite-scroll-component";
import Playlist from "../components/Playlist";
import { Link } from "react-router-dom";

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
    // const memoTracks = useMemo(() => {
    //     return featuredPlaylistsMemo[currentSlide].tracks;
    // }, [featured]);

    const featuredPlaylists = useMemo(() => {
        return featured.map((item, index) => 
            (<div key={`playlist_${index}`} style={{padding: 20}}>
                <h3 style={{background: `url(${item.images[0].url})`,
                    margin: 0,
                    height: '160px',
                    color: '#fff',
                    lineHeight: '160px',
                    textAlign: 'center',}} >
                        
                    <Link to={`/ViewPlaylist?id=${item.id}`}>{item.name}</Link>
                    
                </h3>
                {/* <p>{item.description}</p> */}
            </div>)
        );
    });
    return (
        <div style={{textAlign: "center", textWrap: "pretty", width: "85%", margin: "0 auto"}}>
            {/* <h1><em>web</em>Musik</h1> */}
            <div className="lastPlayed">
                <h2>Featured</h2>
                <Carousel afterChange={onChange} >
                    {featuredPlaylists}
                </Carousel>
            </div>
            {/* <div className="playlistDetails">
                <p>{JSON.stringify(featuredPlaylistsMemo[currentSlideMemo])}</p>
            </div> */}
        </div>
    )
}

/**
 * Wrapping this component with the hoc withAuth so it's only accessible by logged in users
 */
export default withAuth(Home);