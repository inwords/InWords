import { wordlistConstants } from '../constants/wordlistConstants';

const pairsPullLocalRefresh = data => ({
    type: wordlistConstants.PAIRS_PULL_LOCAL_REFRESH,
    payload: data
});

const pairsDelLocalRefresh = pairIds => ({
    type: wordlistConstants.PAIRS_DEL_LOCAL_REFRESH,
    payload: pairIds
});

const pairsAddLocalRefresh = wordPair => ({
    type: wordlistConstants.PAIRS_ADD_LOCAL_REFRESH,
    payload: wordPair
});

const pairsEditLocalRefresh = (pairId, wordPair) => ({
    type: wordlistConstants.PAIRS_EDIT_LOCAL_REFRESH,
    payload: {
        pairId: pairId,
        wordPair: wordPair
    }
});

export const wordlistActions = {
    pairsPullLocalRefresh,
    pairsDelLocalRefresh,
    pairsAddLocalRefresh,
    pairsEditLocalRefresh
};
