import { CALL_API } from 'src/middleware/apiMiddleware';

export default function apiAction(payload) {
  return {
    type: CALL_API,
    payload
  };
}
