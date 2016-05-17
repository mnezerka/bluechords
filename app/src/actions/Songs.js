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
