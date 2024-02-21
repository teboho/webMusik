import { createAction } from 'redux-actions';

const PlaylistActionEnums = {
    addSong: "ADD_SONG",
    removeSong: "REMOVE_SONG",
    savePlaylist: "SAVE_PLAYLIST"
};

const addSong = createAction(
    PlaylistActionEnums.addSong,
    ({song}) => ({
        song
    })
);