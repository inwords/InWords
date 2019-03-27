import { API_ROOT } from '../api';
import { FetchingActions } from './FetchingActions';
import { AccessActions } from './AccessActions';
import { wordlistConstants } from '../constants/wordlistConstants';

const pullWordPairs = () => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Sync/PullWordPairs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: '[]'
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(AccessActions.accessDenied());
                }
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
};

const deleteWordPairs = pairIds => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Words/DeletePair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: JSON.stringify(pairIds)
    })
        .then(response => {
            if (response.status === 401) {
                dispatch(AccessActions.accessDenied());
            }

            dispatch(FetchingActions.fetchingSuccess());
            dispatch(pairsDelLocalRefresh(pairIds));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка удаления слов')));
        });
};

const addWordPair = wordPair => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Words/AddPair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: JSON.stringify([wordPair])
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(AccessActions.accessDenied());
                }
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
};

const editWordPair = wordPair => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Words/DeletePair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: JSON.stringify([wordPair.id])
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(AccessActions.accessDenied());
                }
                throw new Error(response.statusText);
            }
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка редактирования слова')));
        });

    fetch(`${API_ROOT}/Words/AddPair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: JSON.stringify([wordPair])
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(AccessActions.accessDenied());
                }
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            dispatch(FetchingActions.fetchingSuccess());
            dispatch(pairsEditLocalRefresh(wordPair.id, configureWordPair(data, wordPair)));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка редактирования слова')));
        });
};

const findWordPairs = pattern => dispatch => {
    dispatch(pairsSearchPatternChange(pattern))
};

const pairsPullLocalRefresh = wordPairs => ({
    type: wordlistConstants.PAIRS_PULL_LOCAL_REFRESH,
    wordPairs: wordPairs
});

const pairsDelLocalRefresh = pairIds => ({
    type: wordlistConstants.PAIRS_DEL_LOCAL_REFRESH,
    pairIds: pairIds
});

const pairsAddLocalRefresh = wordPair => ({
    type: wordlistConstants.PAIRS_ADD_LOCAL_REFRESH,
    wordPair: wordPair
});

const pairsEditLocalRefresh = (pairId, wordPair) => ({
    type: wordlistConstants.PAIRS_EDIT_LOCAL_REFRESH,
    pairId: pairId,
    wordPair: wordPair
});

const pairsSearchPatternChange = pattern => ({
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
    deleteWordPairs,
    addWordPair,
    editWordPair,
    findWordPairs
};
