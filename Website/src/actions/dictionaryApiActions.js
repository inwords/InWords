import apiAction from './apiAction';
import apiGrpcAction from './apiGrpcAction';
import {
  syncWordPairs as syncWordPairsAction,
  deleteWordPairs as deleteWordPairsAction,
  addWordPairs as addWordPairsAction,
  editWordPairs as editWordPairsAction
} from './dictionaryActions';
import { setSnackbar } from './commonActions';
import { DictionaryProviderClient } from './protobuf-generated/Dictionary.v2_grpc_web_pb';
import {
  GetWordsRequest,
  AddWordRequest,
  AddWordsRequest
} from './protobuf-generated/Dictionary.v2_pb';

export function syncWordPairs(wordPairIds) {
  const request = new GetWordsRequest();
  request.setUserwordpairidsList(wordPairIds);

  return apiGrpcAction({
    Client: DictionaryProviderClient,
    request,
    method: 'getWords',
    onSuccess: ({ dispatch, response }) => {
      dispatch(
        syncWordPairsAction({
          toAdd: response.getToaddList().map(wrappedWordPair => ({
            serverId: wrappedWordPair.getUserwordpair(),
            wordForeign: wrappedWordPair.getWordforeign(),
            wordNative: wrappedWordPair.getWordnative(),
            period: wrappedWordPair.getPeriod()
          })),
          toDelete: response.getTodeleteList()
        })
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить словарь' }));
    }
  });
}

export function deleteWordPairs(pairIds) {
  return apiAction({
    endpoint: '/words/deletePair',
    method: 'POST',
    data: JSON.stringify(pairIds),
    contentType: 'application/json',
    onSuccess: ({ dispatch }) => {
      dispatch(deleteWordPairsAction(pairIds));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось удалить слова' }));
    }
  });
}

export function addWordPairs(wordPairs, { onSuccess } = {}) {
  const request = new AddWordsRequest();
  request.setWordsList(
    wordPairs.map(({ wordForeign, wordNative, index }) => {
      const wordRequest = new AddWordRequest();
      wordRequest.setLocalid(index);
      wordRequest.setWordforeign(wordForeign);
      wordRequest.setWordnative(wordNative);

      return wordRequest;
    })
  );

  return apiGrpcAction({
    Client: DictionaryProviderClient,
    request,
    method: 'addWords',
    onSuccess: ({ dispatch, response }) => {
      const wordIdsList = response.getWordidsList();

      dispatch(
        addWordPairsAction(
          wordPairs.map((wordPair, index) => ({
            ...wordPair,
            serverId: wordIdsList[index].getServerid()
          }))
        )
      );

      if (onSuccess) {
        onSuccess({ dispatch, response });
      }
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  });
}

export function editWordPairs(wordPairsMap) {
  return apiAction({
    endpoint: '/words/updatePair',
    method: 'POST',
    data: JSON.stringify(wordPairsMap),
    contentType: 'application/json',
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        editWordPairsAction(
          Object.entries(wordPairsMap).map((wordPairEntry, index) => ({
            ...wordPairEntry[1],
            oldServerId: +wordPairEntry[0],
            serverId: data[index].serverId
          }))
        )
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(
        setSnackbar({
          text: 'Не удалось изменить слова'
        })
      );
    }
  });
}
