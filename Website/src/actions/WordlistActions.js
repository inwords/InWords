import { API_HOST } from '../api-info';
import { ErrorActions } from '../actions/ErrorActions';
import { AccessTokenActions } from '../actions/AccessTokenActions';
import { wordlistConstants } from '../constants/wordlistConstants';

function pullWordPairs(token) {
    return dispatch => {
        dispatch(pairsPullRequest());

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
                        dispatch(AccessTokenActions.accessTokenInvalid());
                    }

                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(json => {
                dispatch(pairsPullSuccess());
                dispatch(pairsPullLocalRefresh(json.addedWords));
                dispatch(ErrorActions.resetErrorMessage());
            })
            .catch(err => {
                console.error(err);
                dispatch(pairsPullFailure(new Error('Ошибка загрузки словаря')));
            });
    }
}

const pairsPullRequest = () => ({
    type: wordlistConstants.PAIRS_PULL_REQUEST
});

const pairsPullSuccess = () => ({
    type: wordlistConstants.PAIRS_PULL_SUCCESS
});

const pairsPullLocalRefresh = (wordPairs) => ({
    type: wordlistConstants.PAIRS_PULL_LOCAL_REFRESH,
    payload: wordPairs
});

const pairsPullFailure = (error) => ({
    type: wordlistConstants.PAIRS_PULL_FAILURE,
    error: error.message
});

function deleteWordPair(token, pairId) {
    return dispatch => {
        dispatch(pairsDelRequest());

        console.log(pairId)
        fetch(API_HOST + '/api/words/deletepair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify([pairId])
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        dispatch(AccessTokenActions.accessTokenInvalid());
                    }
                    
                    throw new Error(response.statusText);
                }

                dispatch(pairsDelSuccess());
                dispatch(pairsDelLocalRefresh(pairId));
                dispatch(ErrorActions.resetErrorMessage());
            })
            .catch(err => {
                console.error(err);
                dispatch(pairsDelFailure(new Error('Ошибка удаления')));
            });
    }
}

const pairsDelRequest = () => ({
    type: wordlistConstants.PAIRS_DEL_REQUEST
});

const pairsDelSuccess = () => ({
    type: wordlistConstants.PAIRS_DEL_SUCCESS
});

const pairsDelLocalRefresh = (pairId) => ({
    type: wordlistConstants.PAIRS_DEL_LOCAL_REFRESH,
    pairId: pairId
});

const pairsDelFailure = (error) => ({
    type: wordlistConstants.PAIRS_DEL_FAILURE,
    error: error.message
});

export const WordlistActions = {
    pullWordPairs,
    deleteWordPair
};
