import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessActions } from './AccessActions';
import { wordlistConstants } from '../constants/wordlistConstants';

const pullWordPairs = () => (dispatch, getState) => {
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
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(pairsPullLocalRefresh(data.addedWords));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки словаря')));
        });
}

const deleteWordPair = (pairId) => (dispatch, getState) => {
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
            AccessActions.handleAccessError(response, dispatch);

            dispatch(FetchingActions.fetchingSuccess());
            dispatch(pairsDelLocalRefresh(pairId));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка удаления слова')));
        });
}

const addWordPair = (wordPair) => (dispatch, getState) => {
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
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(pairsAddLocalRefresh(configureWordPair(data, wordPair)));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка добавления слова')));
        });
}

const editWordPair = (pairId, wordPair) => (dispatch, getState) => {
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
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка редактирования слова')));
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
                AccessActions.handleAccessError(response, dispatch);
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(pairsEditLocalRefresh(pairId, configureWordPair(data, wordPair)));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка редактирования слова')));
        });
}

const findWordPairs = (pattern) => (dispatch) => {
    dispatch(pairsSearchPatternChange(pattern))
}

const pairsPullLocalRefresh = (wordPairs) => ({
    type: wordlistConstants.PAIRS_PULL_LOCAL_REFRESH,
    wordPairs: wordPairs
});

const pairsDelLocalRefresh = (pairId) => ({
    type: wordlistConstants.PAIRS_DEL_LOCAL_REFRESH,
    pairId: pairId
});

const pairsAddLocalRefresh = (wordPair) => ({
    type: wordlistConstants.PAIRS_ADD_LOCAL_REFRESH,
    wordPair: wordPair
});

const pairsEditLocalRefresh = (pairId, wordPair) => ({
    type: wordlistConstants.PAIRS_EDIT_LOCAL_REFRESH,
    pairId: pairId,
    wordPair: wordPair
});

const pairsSearchPatternChange = (pattern) => ({
    type: wordlistConstants.PAIRS_SEARCH_PATTERN_CHANGE,
    pattern: pattern
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
    editWordPair,
    findWordPairs
};
