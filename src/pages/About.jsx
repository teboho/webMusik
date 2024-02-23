import React, { useReducer, useState } from "react";
import { Watermark } from 'antd';

const About = () => {
    const {} = useReducer()
    return (
        <Watermark content="Search Songs on Spotify">
            <div style={{ height: 800 }} />
            {/* <p>123</p> */}
        </Watermark>
    );
}

export default About;