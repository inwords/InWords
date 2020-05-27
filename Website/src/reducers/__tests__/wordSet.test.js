import {
  all,
  levelsListsMap,
  levelsMap,
  pairsListsMap,
  history
} from 'src/reducers/wordSet';
import {
  INITIALIZE_WORD_SETS,
  INITIALIZE_WORD_SET_LEVELS,
  UPDATE_WORD_SET_LEVEL_RESULT,
  INITIALIZE_WORD_SET_LEVEL,
  REMOVE_WORD_SET_LEVEL_PAIRS,
  INITIALIZE_WORD_SET_PAIRS,
  UPDATE_WORD_SET_PAIRS,
  INITIALIZE_WORD_SET_HISTORY
} from 'src/actions/wordSetActions';

describe('wordSet reducer', () => {
  describe('all reducer', () => {
    it('should return the initial state', () => {
      expect(all(undefined, {})).toEqual([]);
    });

    it('should handle INITIALIZE_WORD_SETS', () => {
      expect(
        all(undefined, {
          type: INITIALIZE_WORD_SETS,
          payload: [{ id: 1, description: 'Описание 1', title: 'Тема 1' }]
        })
      ).toEqual([{ id: 1, description: 'Описание 1', title: 'Тема 1' }]);
    });
  });

  describe('levelsListsMap reducer', () => {
    it('should return the initial state', () => {
      expect(levelsListsMap(undefined, {})).toEqual({});
    });

    it('should handle INITIALIZE_WORD_SET_LEVELS', () => {
      expect(
        levelsListsMap(undefined, {
          type: INITIALIZE_WORD_SET_LEVELS,
          payload: {
            wordSetId: 1,
            levels: [{ levelId: 1, stars: 3, isAvailable: true, level: 1 }]
          }
        })
      ).toEqual({
        1: [{ levelId: 1, stars: 3, isAvailable: true, level: 1 }]
      });
    });

    it('should handle UPDATE_WORD_SET_LEVEL_RESULT', () => {
      expect(
        levelsListsMap(
          {
            1: [{ levelId: 1, score: 2, isAvailable: true, level: 1 }]
          },
          {
            type: UPDATE_WORD_SET_LEVEL_RESULT,
            payload: {
              wordSetId: 1,
              levelResult: { gameLevelId: 1, score: 3 }
            }
          }
        )
      ).toEqual({
        1: [{ levelId: 1, score: 3, isAvailable: true, level: 1 }]
      });
    });
  });

  describe('levelsMap reducer', () => {
    it('should return the initial state', () => {
      expect(levelsMap(undefined, {})).toEqual({});
    });

    it('should handle INITIALIZE_WORD_SET_LEVEL', () => {
      expect(
        levelsMap(undefined, {
          type: INITIALIZE_WORD_SET_LEVEL,
          payload: {
            levelId: 1,
            wordTranslations: [
              { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' },
              { serverId: 2, wordForeign: 'dog', wordNative: 'собака' }
            ]
          }
        })
      ).toEqual({
        1: {
          levelId: 1,
          wordTranslations: [
            { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' },
            { serverId: 2, wordForeign: 'dog', wordNative: 'собака' }
          ]
        }
      });
    });

    it('should handle REMOVE_WORD_SET_LEVEL_PAIRS', () => {
      expect(
        levelsMap(
          {
            1: {
              levelId: 1,
              wordTranslations: [
                { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' },
                { serverId: 2, wordForeign: 'dog', wordNative: 'собака' }
              ]
            }
          },
          {
            type: REMOVE_WORD_SET_LEVEL_PAIRS,
            payload: {
              levelId: 1,
              pairIds: [2]
            }
          }
        )
      ).toEqual({
        1: {
          levelId: 1,
          wordTranslations: [
            { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' }
          ]
        }
      });
    });
  });

  describe('pairsListsMap reducer', () => {
    it('should return the initial state', () => {
      expect(pairsListsMap(undefined, {})).toEqual({});
    });

    it('should handle INITIALIZE_WORD_SET_PAIRS', () => {
      expect(
        pairsListsMap(undefined, {
          type: INITIALIZE_WORD_SET_PAIRS,
          payload: {
            wordSetId: 1,
            wordPairs: [
              {
                wordPairId: 1,
                hasAdded: false,
                wordForeign: 'cat',
                wordNative: 'кошка'
              },
              {
                wordPairId: 2,
                hasAdded: false,
                wordForeign: 'dog',
                wordNative: 'собака'
              }
            ]
          }
        })
      ).toEqual({
        1: [
          {
            serverId: 1,
            hasAdded: false,
            wordForeign: 'cat',
            wordNative: 'кошка'
          },
          {
            serverId: 2,
            hasAdded: false,
            wordForeign: 'dog',
            wordNative: 'собака'
          }
        ]
      });
    });

    it('should handle UPDATE_WORD_SET_PAIRS', () => {
      expect(
        pairsListsMap(
          {
            1: [
              {
                serverId: 1,
                hasAdded: false,
                wordForeign: 'cat',
                wordNative: 'кошка'
              },
              {
                serverId: 2,
                hasAdded: false,
                wordForeign: 'dog',
                wordNative: 'собака'
              }
            ]
          },
          {
            type: UPDATE_WORD_SET_PAIRS,
            payload: {
              wordSetId: 1,
              addedWordPairs: [
                {
                  serverId: 2,
                  hasAdded: false,
                  wordForeign: 'dog',
                  wordNative: 'собака'
                }
              ]
            }
          }
        )
      ).toEqual({
        1: [
          {
            serverId: 1,
            hasAdded: false,
            wordForeign: 'cat',
            wordNative: 'кошка'
          },
          {
            serverId: 2,
            hasAdded: true,
            wordForeign: 'dog',
            wordNative: 'собака'
          }
        ]
      });
    });
  });

  describe('history reducer', () => {
    it('should return the initial state', () => {
      expect(history(undefined, {})).toEqual([]);
    });
    const recentTrainings = [
      {
        levelId: 1,
        isAvailable: true,
        wordsCount: 1
      },
      {
        levelId: 1,
        isAvailable: true,
        wordsCount: 2
      }
    ];

    it('should handle INITIALIZE_WORD_SET_HISTORY', () => {
      expect(
        history(undefined, {
          type: INITIALIZE_WORD_SET_HISTORY,
          payload: recentTrainings
        })
      ).toEqual(recentTrainings.slice().reverse());
    });
  });
});
