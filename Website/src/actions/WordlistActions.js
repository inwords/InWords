import { API_HOST } from '../api-info';
import { wordlistConstants } from '../constants/wordlistConstants';

function pullwordpairs(token) {
    return dispatch => {
        dispatch({ type: wordlistConstants.WORDPAIRS_REQUEST });

        fetch(API_HOST + '/api/sync/pullwordpairs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: '[]'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(json => {
                dispatch({
                    type: wordlistConstants.WORDPAIRS_SUCCESS,
                    payload: json.addedWords
                });
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: wordlistConstants.WORDPAIRS_FAILURE,
                    payload: new Error('Ошибка загрузки слов')
                });
            });
    }
}

export const WordlistActions = {
    pullwordpairs
};
