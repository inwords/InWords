import { API_HOST } from '../api-info';
import { wordlistConstants } from '../constants/wordlistConstants';
import { credentialsConstants } from '../constants/credentialsConstants';

function pullWordPairs(token) {
    return dispatch => {
        dispatch({ type: wordlistConstants.PULL_PAIRS_REQUEST });

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
                    if (response.status === 401) {
                        dispatch({ type: credentialsConstants.TOKEN_INVALID });
                    }
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(json => {
                dispatch({
                    type: wordlistConstants.PULL_PAIRS_SUCCESS,
                    payload: json.addedWords
                });
                dispatch({ type: wordlistConstants.PAIRS_RELEVANT });
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: wordlistConstants.PULL_PAIRS_FAILURE,
                    payload: new Error('Ошибка загрузки')
                });
            });
    }
}

function deleteWordPairs(token, pairsIds) {
    return dispatch => {
        dispatch({ type: wordlistConstants.DEL_PAIRS_REQUEST });

        fetch(API_HOST + '/api/words/deletepair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: pairsIds
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        dispatch({ type: credentialsConstants.TOKEN_INVALID });
                    }
                    throw new Error(response.statusText);
                }
                dispatch({ type: wordlistConstants.DEL_PAIRS_SUCCESS });
                dispatch({ type: wordlistConstants.PAIRS_IRRELEVANT });
                return response.json();
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: wordlistConstants.DEL_PAIRS_FAILURE,
                    payload: new Error('Ошибка удаления')
                });
            });
    }
}

export const WordlistActions = {
    pullWordPairs,
    deleteWordPairs
};
