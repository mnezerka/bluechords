import {createReducer} from 'utils';
import {SONGS_FETCH, SONGS_FETCH_SUCCESS} from 'actions/Songs';

const initialState = {
    data: null,
    sortField: 'name',
    sortAsc: true,
    isFetching: false,
    filter: '',
};

export default createReducer(initialState, {
    [SONGS_FETCH]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    [SONGS_FETCH_SUCCESS]: (state, payload, meta) => {
        return Object.assign({}, state, {
            data: payload,
            isFetching: false,
            sortField: meta.sortField,
            sortAsc: meta.sortAsc,
            filter: meta.filter
        });
    },
});
