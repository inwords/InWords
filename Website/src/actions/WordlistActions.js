import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessTokenActions } from './AccessTokenActions';
import { ErrorActions } from './ErrorActions';
import { wordlistConstants } from '../constants/wordlistConstants';

function pullWordPairs() {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/sync/pullwordpairs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: '[]'
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsPullLocalRefresh(data.addedWords));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки словаря')));
            });
    }
}

const pairsPullLocalRefresh = (wordPairs) => ({
    type: wordlistConstants.PAIRS_PULL_LOCAL_REFRESH,
    wordPairs: wordPairs
});

function deleteWordPair(pairId) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/words/deletepair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: JSON.stringify([pairId])
        })
            .then(response => {
                AccessTokenActions.handleAccessError(response, dispatch);

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsDelLocalRefresh(pairId));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка удаления')));
            });
    }
}

const pairsDelLocalRefresh = (pairId) => ({
    type: wordlistConstants.PAIRS_DEL_LOCAL_REFRESH,
    pairId: pairId
});

function addWordPair(wordPair) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/words/addpair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: JSON.stringify([wordPair])
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsAddLocalRefresh(configureWordPair(data, wordPair)));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка добавления')));
            });
    }
}

const pairsAddLocalRefresh = (wordPair) => ({
    type: wordlistConstants.PAIRS_ADD_LOCAL_REFRESH,
    wordPair: wordPair
});

function editWordPair(pairId, wordPair) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/words/deletepair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: JSON.stringify([pairId])
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка редактирования')));
            });

        fetch(API_HOST + '/api/words/addpair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: JSON.stringify([wordPair])
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsEditLocalRefresh(pairId, configureWordPair(data, wordPair)));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка редактирования')));
            });
    }
}

const pairsEditLocalRefresh = (pairId, wordPair) => ({
    type: wordlistConstants.PAIRS_EDIT_LOCAL_REFRESH,
    pairId: pairId,
    wordPair: wordPair
});

const configureWordPair = (serverData, localWordPair) => ({
    serverId: serverData[0].serverId,
    wordForeign: localWordPair.WordForeign,
    wordNative: localWordPair.WordNative
});

export const WordlistActions = {
    pullWordPairs,
    deleteWordPair,
    addWordPair,
    editWordPair
};
