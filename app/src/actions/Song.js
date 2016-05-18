import {CALL_API} from 'redux-api-middleware';

export const SONG_SAVE = 'SONG_SAVE';
export function save(songStr) {
    return({
        type: SONG_SAVE,
        payload: songStr 
    });
}

export const SONG_TRANSPOSE = 'SONG_TRANSPOSE';
export function transpose(transposeStep) {
    return({
        type: SONG_TRANSPOSE,
        payload: transposeStep
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

export const SONG_PUSH = 'SONG_PUSH';
export const SONG_PUSH_SUCCESS = 'SONG_PUSH_SUCCESS';
export const SONG_PUSH_FAIL = 'SONG_PUSH_FAIL';
export function push() {
    return (dispatch, getState) => {
        let song = getState().song.song;
        if (song === null) {
            return null;
        }

        let body = JSON.stringify(song);

        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs/' + song.id,  //eslint-disable-line no-undef
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body,
            types: [
                SONG_PUSH,
                SONG_PUSH_SUCCESS,
                SONG_PUSH_FAIL
            ]
        }});
    }
}
