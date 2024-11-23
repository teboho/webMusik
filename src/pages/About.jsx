import React, { useReducer, useState } from "react";
import { Watermark } from 'antd';

const About = () => {
    return (
        <Watermark content="Search Songs on Spotify">
            <div style={{ height: "800px"}}>
                <p>This page is not protected</p>
                <p>You need to login with your spotify account to use all the other pages</p>
            </div>
        </Watermark>
    );
}

export default About;