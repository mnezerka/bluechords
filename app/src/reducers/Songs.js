import {createReducer} from 'utils';
import {SONGS_FETCH, SONGS_FETCH_SUCCESS} from 'actions/Songs';

const initialState = {
    data: null,
    sortField: 'id',
    sortAsc: true,
    isFetching: false,
    filter: null,
    pageSize: 20,
    page: 1,
    total: 0
};

export default createReducer(initialState, {
    [SONGS_FETCH]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    [SONGS_FETCH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload,
            isFetching: false
        });
    },
});
