import { wordlistActions } from './wordlistActions';
import { apiAction } from './apiAction';

function pullWordPairs() {
    return apiAction({
        endpoint: 'Sync/PullWordPairs',
        method: 'POST',
        data: JSON.stringify([]),
        onSuccess: [wordlistActions.pairsPullLocalRefresh],
        errorMessage: 'Ошибка загрузки словаря'
    });
}

function deleteWordPairs(pairIds) {
    return apiAction({
        endpoint: 'Words/DeletePair',
        method: 'POST',
        data: JSON.stringify(pairIds),
        onSuccess: [() => wordlistActions.pairsDelLocalRefresh(pairIds)],
        errorMessage: 'Ошибка удаления слов'
    });
}

function addWordPair(wordPair) {
    return apiAction({
        endpoint: 'Words/AddPair',
        method: 'POST',
        data: JSON.stringify([wordPair]),
        onSuccess: [(data) => wordlistActions.pairsAddLocalRefresh(configureWordPair(data, wordPair))],
        errorMessage: 'Ошибка добавления слова'
    });
}

function deleteWordPairAsEditPart(pairId) {
    return apiAction({
        endpoint: 'Words/DeletePair',
        method: 'POST',
        data: JSON.stringify([pairId]),
        errorMessage: 'Ошибка редактирования слова'
    });
}

function addWordPairAsEditPart(wordPair) {
    return apiAction({
        endpoint: 'Words/AddPair',
        method: 'POST',
        data: JSON.stringify([wordPair]),
        onSuccess: [(data) => wordlistActions.pairsEditLocalRefresh(wordPair.id, configureWordPair(data, wordPair))],
        errorMessage: 'Ошибка редактирования слова'
    });
}

const configureWordPair = (serverData, localWordPair) => ({
    serverId: serverData[0].serverId,
    wordForeign: localWordPair.WordForeign,
    wordNative: localWordPair.WordNative
});

export const wordlistApiActions = {
    pullWordPairs,
    deleteWordPairs,
    addWordPair,
    deleteWordPairAsEditPart,
    addWordPairAsEditPart
};
