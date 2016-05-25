import {CALL_API} from 'redux-api-middleware';
import querystring from 'querystring';

export const SONGS_FETCH = 'SONGS_FETCH';
export const SONGS_FETCH_SUCCESS = 'SONGS_FETCH_SUCCESS';
export const SONGS_FETCH_FAIL = 'SONGS_FETCH_FAIL';
export function fetchSongs(options={}) {
    options.sortField = 'sortField' in options ? options.sortField : 'name'; 
    options.sortAsc = 'sortAsc' in options ? options.sortAsc : true;
    options.filter = 'filter' in options ? options.filter: '';

    return (dispatch) => {

        let urlParams = {               
            ordering: `${options.sortAsc ? '' : '-'}${options.sortField}`
        };

        if ('filter' in options) {
            urlParams.filter = options.filter;
        }

        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs/?' + querystring.stringify(urlParams),  //eslint-disable-line no-undef
            method: 'GET',
            types: [
                SONGS_FETCH,
                {
                    type: SONGS_FETCH_SUCCESS,
                    meta: {
                        sortField: options.sortField,
                        sortAsc:  options.sortAsc,
                        filter:  options.filter
                    }
                },
                SONGS_FETCH_FAIL
            ]
        }});
    }
}

export const SONG_ADD = 'SONG_ADD';
export const SONG_ADD_SUCCESS = 'SONG_ADD_SUCCESS';
export const SONG_ADD_FAIL = 'SONG_ADD_FAIL';
export function addSong(song) {
    return (dispatch, getState) => {
        let token = getState().auth.token;

        if (song === null) {
            return null;
        }

        song.data = `{title: ${song.name}}`

        let body = JSON.stringify(song);

        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs',  //eslint-disable-line no-undef
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization-bp': 'BP ' + token
            },
            body,
            types: [
                SONG_ADD,
                SONG_ADD_SUCCESS,
                SONG_ADD_FAIL
            ]
        }}).then((action) => {
            if (action.type === SONG_ADD_SUCCESS) {
                dispatch(fetchSongs());
            }
        });
    }
}

export const SONG_DELETE = 'SONG_DELETE';
export const SONG_DELETE_SUCCESS = 'SONG_DELETE_SUCCESS';
export const SONG_DELETE_FAIL = 'SONG_DELETE_FAIL';
export function deleteSong(song) {
    return (dispatch, getState) => {
        let token = getState().auth.token;

        if (song === null) {
            return null;
        }

        dispatch({[CALL_API]: {
            endpoint: config.api + 'songs/' + song.id,  //eslint-disable-line no-undef
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization-bp': 'BP ' + token
            },
            types: [
                SONG_DELETE,
                SONG_DELETE_SUCCESS,
                SONG_DELETE_FAIL
            ]
        }}).then((action) => {
            if (action.type === SONG_DELETE_SUCCESS) {
                dispatch(fetchSongs());
            }
        });
    }
}
