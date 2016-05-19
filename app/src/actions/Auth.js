import {CALL_API} from 'redux-api-middleware';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export function loginUser(username, password, redirect=config.path) {
    return (dispatch) => {
        dispatch({[CALL_API]: {
            endpoint: config.api + 'auth',    //eslint-disable-line no-undef
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password}),
            credentials: 'include',
            types: [
                LOGIN_USER_REQUEST,
                LOGIN_USER_SUCCESS,
                LOGIN_USER_FAIL
            ]
        }}).then((action) => {
            switch (action.type) {
            case LOGIN_USER_SUCCESS:
                localStorage.setItem('token', action.payload.token);
                //TODO dispatch(push(redirect));
                break;
            case LOGIN_USER_FAIL:
                localStorage.removeItem('token');
                break;
            }
        });
    }
}

export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: { token }
    }
}

export const LOGOUT_USER = 'LOGOUT_USER';
export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
        error: false
    }
}
