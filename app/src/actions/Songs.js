import {CALL_API} from 'redux-api-middleware';

export const SONGS_FETCH = 'SONGS_FETCH';
export const SONGS_FETCH_SUCCESS = 'SONGS_FETCH_SUCCESS';
export const SONGS_FETCH_FAIL = 'SONGS_FETCH_FAIL';
export function fetchSongs() {
    return (dispatch, state) => {
        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs',  //eslint-disable-line no-undef
            method: 'GET',
            types: [
                SONGS_FETCH,
                SONGS_FETCH_SUCCESS,
                SONGS_FETCH_FAIL
            ]
        }});
    }
}
