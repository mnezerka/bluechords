import {createReducer} from 'utils';
import {SONG_SAVE, SONG_FETCH, SONG_FETCH_SUCCESS} from 'actions/Song';

const initialState = {
    song: null,
    isFetching: false,
};

export default createReducer(initialState, {

    [SONG_SAVE]: (state, payload) => {
        return Object.assign({}, state, {
            song: payload
        });
    },
    [SONG_FETCH]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    [SONG_FETCH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            song: payload,
            isFetching: false
        });
    },

});
