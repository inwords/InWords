import { API_HOST } from '../api-info'
import { userConstants } from '../constants/userConstants'

function login(userdata) {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_REQUEST
        });

        fetch(API_HOST + '/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Version': '2.0'
            },
            body: userdata
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(json => {
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: json.access_token
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    payload: new Error('Ошибка авторизации')
                });
            });
    }
}

function logout() {

}

function register(userdata) {
    return dispatch => {
        dispatch({
            type: userConstants.REGISTER_REQUEST
        });

        fetch(API_HOST + '/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userdata
        })
            .then(response => {
                console.log(response)
                console.log(userdata)
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(json => {
                dispatch({
                    type: userConstants.REGISTER_SUCCESS,
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: userConstants.REGISTER_FAILURE,
                    payload: new Error('Ошибка регистрации')
                });
            });
    }
}

export const UserActions = {
    login,
    logout,
    register
};
