import { saveState, removeState } from 'src/localStorage';
import { GRANT_ACCESS, DENY_ACCESS } from 'src/actions/authActions';

const persistDataMiddleware = () => next => action => {
  switch (action.type) {
    case GRANT_ACCESS:
      saveState({
        auth: {
          token: action.payload.token,
          userId: action.payload.userId
        }
      });
      break;
    case DENY_ACCESS:
      removeState();
      break;
    default:
  }

  return next(action);
};

export default persistDataMiddleware;
