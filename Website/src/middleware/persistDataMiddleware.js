import { saveState } from 'localStorage';
import { GRANT_ACCESS } from 'actions/accessActions';

const persistDataMiddleware = store => next => action => {
  if (action.type === GRANT_ACCESS) {
    saveState({
      access: {
        token: action.payload.token,
        userId: action.payload.userId
      }
    });
  }

  return next(action);
};

export default persistDataMiddleware;
