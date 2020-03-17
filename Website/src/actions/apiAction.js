import { CALL_API } from 'src/middleware/apiMiddleware';

const apiAction = payload => ({
  type: CALL_API,
  payload
});

export default apiAction;
