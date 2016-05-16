import {CALL_API} from 'redux-api-middleware';

export const SONG_SAVE = 'SONG_SAVE';
export function save(songStr) {
    return({
        type: SONG_SAVE,
        payload: songStr 
    });
}

export const SONG_FETCH = 'SONG_FETCH';
export const SONG_FETCH_SUCCESS = 'SONG_FETCH_SUCCESS';
export const SONG_FETCH_FAIL = 'SONG_FETCH_FAIL';
export function fetchSong(songId) {
    return (dispatch) => {
        dispatch({[CALL_API]: {
            endpoint: config.api + 'song/' + songId,  //eslint-disable-line no-undef
            method: 'GET',
            types: [
                SONG_FETCH,
                SONG_FETCH_SUCCESS,
                SONG_FETCH_FAIL
            ]
        }});
    }
}
