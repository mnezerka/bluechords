import {createReducer} from 'utils';
import {SONG_SAVE, SONG_TRANSPOSE, SONG_FETCH,
     SONG_FETCH_SUCCESS, SONG_PUSH, SONG_PUSH_SUCCESS} from 'actions/Song';

const initialState = {
    song: null,
    isFetching: false,
    isModified: false,
    transposeStep: 0
};

export default createReducer(initialState, {

    [SONG_SAVE]: (state, payload) => {
        // do nothing if no song is being edited
        if (state.song === null) {
            return state;
        }

        // set new song data
        let newSong = Object.assign({}, state.song, {
            data: payload
        });
        return Object.assign({}, state, {
            song: newSong,
            isModified: true
        });
    },

    [SONG_TRANSPOSE]: (state, payload) => {
        return Object.assign({}, state, {
            transposeStep: payload
        });
    },

    [SONG_FETCH]: (state) => {
        return Object.assign({}, state, {
            song: null,
            isFetching: true,
            isModified: false,
            transposeStep: 0
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
