import React, { createContext } from 'react';
import { PlaylistContext } from './context';

const PlaylistProvider = (props) => {
    
    return (
        <PlaylistContext.Provider>
            {props.children}
        </PlaylistContext.Provider>
    );
};

export { PlaylistProvider };