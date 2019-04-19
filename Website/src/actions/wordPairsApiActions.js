import wordPairsActions from './wordPairsActions';
import apiAction from './apiAction';

function pullWordPairs() {
    return apiAction({
        endpoint: 'Sync/PullWordPairs',
        method: 'POST',
        data: JSON.stringify([]),
        actionsOnSuccess: [wordPairsActions.initializeWordPairs],
        errorMessage: 'Ошибка загрузки словаря'
    });
}

function deleteWordPairs(pairIds) {
    return apiAction({
        endpoint: 'Words/DeletePair',
        method: 'POST',
        data: JSON.stringify(pairIds),
        actionsOnSuccess: [() => wordPairsActions.updateWordPairsAfterDeletion(pairIds)],
        errorMessage: 'Ошибка удаления слов'
    });
}

function addWordPair(wordPair) {
    return apiAction({
        endpoint: 'Words/AddPair',
        method: 'POST',
        data: JSON.stringify([wordPair]),
        actionsOnSuccess: [data => wordPairsActions.updateWordPairsAfterAddition(configureWordPair(data, wordPair))],
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
        actionsOnSuccess: [data => wordPairsActions.updateWordPairsAfterEditing(wordPair.id, configureWordPair(data, wordPair))],
        errorMessage: 'Ошибка редактирования слова'
    });
}

const configureWordPair = (serverData, localWordPair) => ({
    serverId: serverData[0].serverId,
    ...localWordPair
});

export default {
    pullWordPairs,
    deleteWordPairs,
    addWordPair,
    deleteWordPairAsEditPart,
    addWordPairAsEditPart
};
