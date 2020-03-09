import apiAction from './apiAction';
//import apiGrpcAction from './apiGrpcAction';
import {
  syncWordPairs as syncWordPairsAction,
  deleteWordPairs as deleteWordPairsAction,
  addWordPairs as addWordPairsAction,
  editWordPairs as editWordPairsAction
} from './dictionaryActions';
import { setSnackbar } from './commonActions';
// import { DictionaryProviderClient } from './protobuf-generated/Dictionary.v2_grpc_web_pb';
// import {
//   AddWordRequest,
//   AddWordsRequest
// } from './protobuf-generated/Dictionary.v2_pb';

export function syncWordPairs(wordPairIds) {
  return apiAction({
    endpoint: '/sync/pullWordPairs',
    method: 'POST',
    data: JSON.stringify(wordPairIds),
    contentType: 'application/json',
    onSuccess: ({ dispatch, data }) => {
      dispatch(syncWordPairsAction(data));
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

export function addWordPairs(wordPairs) {
  // const request = new AddWordsRequest();
  // request.setWordsList(
  //   wordPairs.map(({ wordForeign, wordNative }) => {
  //     const wordRequest = new AddWordRequest();
  //     wordRequest.setWordforeign(wordForeign);
  //     wordRequest.setWordnative(wordNative);

  //     return wordRequest;
  //   })
  // );

  // return apiGrpcAction({
  //   Client: DictionaryProviderClient,
  //   request,
  //   method: 'addWords',
  //   onSuccess: ({ dispatch, response }) => {
  //     // dispatch(
  //     //   addWordPairsAction(
  //     //     wordPairs.map((wordPair, index) => ({
  //     //       ...wordPair,
  //     //       serverId: data[index].serverId
  //     //     }))
  //     //   )
  //     // );
  //   },
  //   onFailure: ({ dispatch }) => {
  //     dispatch(setSnackbar({ text: 'Не удалось добавить слово' }));
  //   }
  // });

  return apiAction({
    endpoint: '/words/addPair',
    method: 'POST',
    data: JSON.stringify(wordPairs),
    contentType: 'application/json',
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        addWordPairsAction(
          wordPairs.map((wordPair, index) => ({
            ...wordPair,
            serverId: data[index].serverId
          }))
        )
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось добавить слово' }));
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
          text: 'Не удалось изменить слово'
        })
      );
    }
  });
}
