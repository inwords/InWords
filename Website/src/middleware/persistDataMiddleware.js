import { saveState } from 'src/localStorage';
import { GRANT_ACCESS, DENY_ACCESS } from 'src/actions/accessActions';

const persistDataMiddleware = store => next => action => {
  switch (action.type) {
    case GRANT_ACCESS:
      saveState({
        access: {
          token: action.payload.token,
          userId: action.payload.userId
        }
      });
      break;
    case DENY_ACCESS:
      saveState({
        access: {
          token: null,
          userId: null
        }
      });
      break;
    default:
  }

  return next(action);
};

export default persistDataMiddleware;
