import { API_HOST } from '../api-info';
import { FetchingActions } from '../actions/FetchingActions';
import { AccessTokenActions } from '../actions/AccessTokenActions';
import { ErrorActions } from '../actions/ErrorActions';
import { wordlistConstants } from '../constants/wordlistConstants';

function pullWordPairs(token) {
    return dispatch => {
        dispatch(FetchingActions.fetchingRequest());

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
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsPullLocalRefresh(json.addedWords));
                dispatch(ErrorActions.resetErrorMessage());
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки словаря')));
            });
    }
}

const pairsPullLocalRefresh = (wordPairs) => ({
    type: wordlistConstants.PAIRS_PULL_LOCAL_REFRESH,
    payload: wordPairs
});

function deleteWordPair(token, pairId) {
    return dispatch => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/words/deletepair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: pairId
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        dispatch(AccessTokenActions.accessTokenInvalid());
                    }

                    throw new Error(response.statusText);
                }

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsDelLocalRefresh(JSON.parse(pairId)[0]));
                dispatch(ErrorActions.resetErrorMessage());
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

function addWordPair(token, wordPair) {
    return dispatch => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/words/addpair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: wordPair
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
                const wordPairToAdd = JSON.parse(wordPair)[0];
                const addedWordPair = {
                    serverId: json[0].serverId,
                    wordForeign: wordPairToAdd.WordForeign,
                    wordNative: wordPairToAdd.WordNative
                }

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsAddLocalRefresh(addedWordPair));
                dispatch(ErrorActions.resetErrorMessage());
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

function editWordPair(token, pairId, wordPair) {
    return dispatch => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/words/deletepair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: pairId
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        dispatch(AccessTokenActions.accessTokenInvalid());
                    }

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
                'Authorization': 'Bearer ' + token
            },
            body: wordPair
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
                const wordPairToEdit = JSON.parse(wordPair)[0];
                const editedWordPair = {
                    serverId: json[0].serverId,
                    wordForeign: wordPairToEdit.WordForeign,
                    wordNative: wordPairToEdit.WordNative
                }

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(pairsEditLocalRefresh(JSON.parse(pairId)[0], editedWordPair));
                dispatch(ErrorActions.resetErrorMessage());
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

export const WordlistActions = {
    pullWordPairs,
    deleteWordPair,
    addWordPair,
    editWordPair
};
