import { CALL_API } from 'src/middleware/apiMiddleware';

export default function apiAction({
  apiVersion = 'v1.0',
  endpoint = '',
  method = 'GET',
  authorizationRequired = true,
  data = null,
  actionsOnSuccess = [],
  actionsOnFailure = []
}) {
  return {
    type: CALL_API,
    payload: {
      apiVersion,
      endpoint,
      method,
      authorizationRequired,
      data,
      actionsOnSuccess,
      actionsOnFailure
    }
  };
}
