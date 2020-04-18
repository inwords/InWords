import { loading, snackbar } from 'src/reducers/common';
import {
  BEGIN_LOADING,
  END_LOADING,
  SET_SNACKBAR,
  RESET_SNACKBAR
} from 'src/actions/commonActions';

describe('common reducer', () => {
  describe('loading reducer', () => {
    it('should return the initial state', () => {
      expect(loading(undefined, {})).toBeFalsy;
    });

    it('should handle BEGIN_LOADING', () => {
      expect(loading(undefined, { type: BEGIN_LOADING }).loading).toBeTruthy;
    });

    it('should handle END_LOADING', () => {
      expect(loading(true, { type: END_LOADING }).loading).toBeFalsy;
    });
  });

  describe('snackbar reducer', () => {
    const initialState = {
      open: false,
      text: '',
      actionText: '',
      handleAction: null
    };
    const action = () => {};

    it('should return the initial state', () => {
      expect(snackbar(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_SNACKBAR', () => {
      expect(
        snackbar(undefined, {
          type: SET_SNACKBAR,
          payload: {
            text: 'text',
            actionText: 'action',
            handleAction: action
          }
        })
      ).toEqual({
        open: true,
        text: 'text',
        actionText: 'action',
        handleAction: action
      });
    });

    it('should handle RESET_SNACKBAR', () => {
      expect(
        snackbar(
          {
            open: true,
            text: 'text',
            actionText: 'action',
            handleAction: action
          },
          { type: RESET_SNACKBAR }
        )
      ).toEqual(initialState);
    });
  });
});
