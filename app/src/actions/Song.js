import {CALL_API} from 'redux-api-middleware';

export const SONG_SET_DATA = 'SONG_SET_DATA';
export function setData(data) {
    return({
        type: SONG_SET_DATA,
        payload: data 
    });
}

export const SONG_SET_INFO = 'SONG_SET_INFO';
export function setInfo(song) {
    return({
        type: SONG_SET_INFO,
        payload: song 
    });
}

export const SONG_FETCH = 'SONG_FETCH';
export const SONG_FETCH_SUCCESS = 'SONG_FETCH_SUCCESS';
export const SONG_FETCH_FAIL = 'SONG_FETCH_FAIL';
export function fetchSong(songId) {
    return (dispatch) => {
        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs/' + songId,  //eslint-disable-line no-undef
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
        let token = getState().auth.token;

        if (song === null) {
            return null;
        }

        let body = JSON.stringify(song);

        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs/' + song.id,  //eslint-disable-line no-undef
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization-bp': 'BP ' + token
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
