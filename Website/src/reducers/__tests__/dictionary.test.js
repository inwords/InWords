import dictionary from 'src/reducers/dictionary';
import {
  SYNC_WORD_PAIRS,
  DELETE_WORD_PAIRS,
  ADD_WORD_PAIRS,
  UPDATE_WORD_PAIRS,
  RESET_WORD_PAIRS_ACTUALITY
} from 'src/actions/dictionaryActions';

describe('dictionary reducer', () => {
  it('should return the initial state', () => {
    expect(dictionary(undefined, {})).toEqual({
      actual: false,
      wordPairs: []
    });
  });

  it('should handle SYNC_WORD_PAIRS', () => {
    expect(
      dictionary(
        {
          actual: false,
          wordPairs: [
            { serverId: 1, wordForeign: 'i', wordNative: 'я' },
            { serverId: 2, wordForeign: 'you', wordNative: 'ты' }
          ]
        },
        {
          type: SYNC_WORD_PAIRS,
          payload: {
            toDelete: [2],
            toAdd: [
              { userWordPair: 3, wordForeign: 'cat', wordNative: 'кошка' },
              { userWordPair: 4, wordForeign: 'dog', wordNative: 'собака' }
            ]
          }
        }
      )
    ).toEqual({
      actual: true,
      wordPairs: [
        { serverId: 3, wordForeign: 'cat', wordNative: 'кошка' },
        { serverId: 4, wordForeign: 'dog', wordNative: 'собака' },
        { serverId: 1, wordForeign: 'i', wordNative: 'я' }
      ]
    });
  });

  it('should handle DELETE_WORD_PAIRS', () => {
    expect(
      dictionary(
        {
          actual: true,
          wordPairs: [
            { serverId: 3, wordForeign: 'cat', wordNative: 'кошка' },
            { serverId: 4, wordForeign: 'dog', wordNative: 'собака' },
            { serverId: 1, wordForeign: 'i', wordNative: 'я' }
          ]
        },
        {
          type: DELETE_WORD_PAIRS,
          payload: [1, 3]
        }
      )
    ).toEqual({
      actual: true,
      wordPairs: [{ serverId: 4, wordForeign: 'dog', wordNative: 'собака' }]
    });
  });

  it('should handle ADD_WORD_PAIRS', () => {
    expect(
      dictionary(
        {
          actual: true,
          wordPairs: [{ serverId: 3, wordForeign: 'cat', wordNative: 'кошка' }]
        },
        {
          type: ADD_WORD_PAIRS,
          payload: [
            { serverId: 1, wordForeign: 'i', wordNative: 'я' },
            { serverId: 4, wordForeign: 'dog', wordNative: 'собака' }
          ]
        }
      )
    ).toEqual({
      actual: true,
      wordPairs: [
        { serverId: 3, wordForeign: 'cat', wordNative: 'кошка' },
        { serverId: 4, wordForeign: 'dog', wordNative: 'собака' },
        { serverId: 1, wordForeign: 'i', wordNative: 'я' }
      ]
    });

    expect(
      dictionary(
        {
          actual: true,
          wordPairs: [{ serverId: 3, wordForeign: 'cat', wordNative: 'кошка' }]
        },
        {
          type: ADD_WORD_PAIRS,
          payload: [
            { serverId: 1, wordForeign: 'i', wordNative: 'я' },
            { serverId: 3, wordForeign: 'dog', wordNative: 'собака' }
          ]
        }
      )
    ).toEqual({
      actual: true,
      wordPairs: [
        { serverId: 3, wordForeign: 'dog', wordNative: 'собака' },
        { serverId: 1, wordForeign: 'i', wordNative: 'я' }
      ]
    });
  });

  it('should handle UPDATE_WORD_PAIRS', () => {
    expect(
      dictionary(
        {
          actual: true,
          wordPairs: [
            { serverId: 1, wordForeign: 'you', wordNative: 'ты' },
            { serverId: 3, wordForeign: 'cat', wordNative: 'кошка' }
          ]
        },
        {
          type: UPDATE_WORD_PAIRS,
          payload: [
            { oldServerId: 1, serverId: 2, wordForeign: 'i', wordNative: 'я' },
            {
              oldServerId: 3,
              serverId: 4,
              wordForeign: 'dog',
              wordNative: 'собака'
            }
          ]
        }
      )
    ).toEqual({
      actual: true,
      wordPairs: [
        { serverId: 4, wordForeign: 'dog', wordNative: 'собака' },
        { serverId: 2, wordForeign: 'i', wordNative: 'я' }
      ]
    });
  });

  it('should handle RESET_WORD_PAIRS_ACTUALITY', () => {
    expect(
      dictionary(
        {
          actual: true,
          wordPairs: [{ serverId: 3, wordForeign: 'cat', wordNative: 'кошка' }]
        },
        { type: RESET_WORD_PAIRS_ACTUALITY }
      )
    ).toEqual({
      actual: false,
      wordPairs: [{ serverId: 3, wordForeign: 'cat', wordNative: 'кошка' }]
    });
  });
});
