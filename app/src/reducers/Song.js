import {createReducer} from 'utils';
import {SONG_SET_DATA, SONG_SET_INFO, SONG_FETCH,
     SONG_FETCH_SUCCESS, SONG_PUSH, SONG_PUSH_SUCCESS} from 'actions/Song';

const initialState = {
    song: null,
    isFetching: false,
    isModified: false,
};

export default createReducer(initialState, {

    [SONG_SET_DATA]: (state, payload) => {
        // do nothing if no song is being edited
        if (state.song === null) { return state; }

        // set new song data
        let newSong = Object.assign({}, state.song, {
            data: payload
        });
        return Object.assign({}, state, {
            song: newSong,
            isModified: true
        });
    },

    [SONG_SET_INFO]: (state, payload) => {
        // do nothing if no song is being edited
        if (state.song === null) { return state; }

        // set new song info 
        let newSong = Object.assign({}, state.song, {
            name: payload.name,
            artist: payload.artist
        });
        return Object.assign({}, state, {
            song: newSong,
            isModified: true
        });
    },

    [SONG_FETCH]: (state) => {
        return Object.assign({}, state, {
            song: null,
            isFetching: true,
            isModified: false
        });
    },

    [SONG_FETCH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            song: payload,
            isFetching: false
        });
    },

    [SONG_PUSH]: (state) => {
        return Object.assign({}, state, {
            song: null,
            isFetching: true,
        });
    },

    [SONG_PUSH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            song: payload,
            isModified: false,
            isFetching: false
        });
    },


});
