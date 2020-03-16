import { CALL_API_GRPC } from 'src/middleware/apiGrpcMiddleware';

export default function apiGrpcAction(payload) {
  return {
    type: CALL_API_GRPC,
    payload
  };
}
