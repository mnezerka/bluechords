import {createReducer} from 'utils';
import {SONG_SAVE} from 'actions/Song';

const initialState = {
    songStr: ''
};

export default createReducer(initialState, {

    [SONG_SAVE]: (state, payload) => {
        return Object.assign({}, state, {
            songStr: payload
        });
    },

});
